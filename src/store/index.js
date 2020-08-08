import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import * as firebase from 'firebase'
export const store = new Vuex.Store({

    state :{
         LoadedMeetups:[
            //  {
            //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
            //     id: 'afajfjadfaadfa323',
            //      title: 'Meetup in New York',
            //      date: new Date(),
            //      location: 'New York',
            //      description: 'New York, New York!',
            //      createrid:'njhyfzz45lkfeud',
            
            //    },
            //   {
            //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
            //     id: 'aadsfhbkhlk1241',
            //     title: 'Meetup in Paris',
            //     date: new Date(),
            //     location: 'Paris',
            //     description: 'It\'s Paris!',
            //     createrid:'njhyfzz45lkfeud',
            //   }
        ],
        users:null,
        loading:false,
        error:null,
    },
    mutations:{
        setloadedmeetups(state,payload){
          state.LoadedMeetups = payload
        },
        registerUserMeetups(state,payload){
            const id = payload.id
            if (state.users.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0){
                    return;
            }
            state.users.registeredMeetups.push(id)
            state.users.fbasekey[id] = payload.fbasekey
        },
        unregisterUserMeetups(state,payload){
            const registeredMeetups = state.users.registeredMeetups
            registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload),1)
            Reflect.deleteProperty(state.users.fbasekey,payload)
        },
        createMeetup(state,payload){
            state.LoadedMeetups.push(payload)
        },
        updatemeetup(state,payload){
            const meetup = state.LoadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if(payload.title){
                meetup.title = payload.title
            }
            if(payload.description){
                meetup.description = payload.description
            }
            if(payload.date){
                meetup.date = payload.date
            }
        },
        SetUser(state,payload){
            state.users = payload
        },
        SetLoading(state,payload){
            state.loading = payload
        },
        SetError(state,payload){
            state.error = payload
        },
        cleanError(state){
            state.error = null
        }
    },
    actions:{
        loadMeetups({commit}){
            commit('SetLoading', true)
            firebase.database().ref('meetups').once("value")
              .then((data) => {
                  const meetups=[]
                  const obj = data.val()
                  for (let key in obj){
                      meetups.push({
                          id:key,
                          title:obj[key].title,
                          description:obj[key].description,
                          location:obj[key].location,
                          imageUrl: obj[key].imageUrl,
                          date:obj[key].date,
                          createrid: obj[key].createrid
                      })
                  }
                  commit('setloadedmeetups',meetups)
                  commit('SetLoading', false)
              })
                .catch((erroe) => {
                    console.log(erroe)
                    commit('SetLoading', false)

                })
        },
        createMeetup({commit, getters}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date.toISOString(),
                createrid: getters.users.id,
               
            }
            let imageUrl
            let key
            firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then(key => {
                    const fileName = payload.image.name
                    const extension = fileName.slice(fileName.lastIndexOf('.'))
                    return firebase.storage().ref('meetup/' + key + '.' + extension).put(payload.image)
                 })
                 .then(uploadTaskSnapshot => {
                    return uploadTaskSnapshot.ref.getDownloadURL()
                 })
                 .then(imageUrl => {
                   return firebase.database().ref('meetups').child(key).update({
                         imageUrl: imageUrl
                     })
                 })
                .then(() => {
                    commit('createMeetup', {
                        ...meetup,
                        imageUrl: imageUrl,
                        id: key   
                    }) 
                })
                .catch((err) => {
                    console.log(err)
                })
            // Reach out to firebase and store it
        },
        UpdateMeetup({commit},payload){
            const updateobj={}
            if(payload.title){
                updateobj.title = payload.title
            }
            if(payload.description){
                updateobj.description = payload.description
            }
            if(payload.date){
                updateobj.date= payload.date
            }
            firebase.database().ref('meetups').child(payload.id).update(updateobj)
            .then(() => {
                commit('updatemeetup',payload)
            })
            .catch(error => {
                console.log(error)
            })
        },
        SignUpUsers({commit},payload){
            commit('SetLoading', false)
            commit('cleanError')
            firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
                .then(user => {
                    commit('SetLoading', false)
                    const newuser={
                        id : user.id,
                        RegisterdMeetups:[],
                        fbasekey:{}
                    }
                    commit('SetUser',newuser)
                }).catch(
                    error => {
                        commit('SetLoading', false)
                        commit('SetError', error)
                        console.log(error)
                    }
            )
        },
        SignInUsers({commit},payload){
            commit('SetLoading', false)
            commit('cleanError')
            firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
                //.signInWithEmailAndPassword(payload.email,payload.password)
                .then(user => {
                    commit('SetLoading', false)
                       const newuser={
                           id : user.id,
                          RegisterdMeetups:[],
                          fbasekey:{}
                }
                    commit('SetUser',newuser)
                }).catch(
                    error => {
                        commit('SetLoading', false)
                        commit('SetError', error)
                        console.log(error)
                    }
            )
        },
        autoSignIn ({commit}, payload) {
            commit('SetUser', {id: payload.uid, registeredMeetups: [],fbasekey:{}})
        },
        logout({commit}){
            firebase.auth().signOut()
            commit ('SetUser',null)
        },
        RegisterUserMeetups({commit,getters},payload){
            const user = getters.users
            firebase.database().ref('/users/'  + user.id).child('registerations/')
            .push(payload)
            .then(data => {
                commit('registerUserMeetups',{id:payload, fbasekey:data.key})
            }).catch(error => {
                console.log(error)
            })
        },
        UnRegisterUserMeetups({commit,getters},payload){
            const user = getters.users
            if(!user.fbasekey){
                return
            }
            const fbkey = user.fbasekey[payload]
            firebase.database().ref('/users/'+ user.id + '/registerations').child(fbkey).remove()
            .then(() => {
                commit("unregisterUserMeetups",payload)
            }).catch(error =>{
                console.log(error)
            })

        },
        fetchUserdata({getters}){
            firebase.database().ref('/users/' + getters.users.id + '/registerations/').once('value').then(data => {
                const values = data.val()
                let registeredMeetups = []
                let swapdata = []
                for(let key in values){
                    registeredMeetups.push(values[key])
                    swapdata[values[key]] = key
                }
                const UpdatedUser = {
                    id :getters.users.id,
                    registeredMeetups  : registeredMeetups,
                    fbasekey  : swapdata
                }
                this.commit("SetUser",UpdatedUser)
            }).catch(error => {
                console.log(error)
            })
            
        }

    },
    getters:{
        LoadedMeetups(state){
            return state.LoadedMeetups.sort((meetupA,meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetup(state,getters){
            return getters.LoadedMeetups.slice(0,5);
        },
        LoadedMeetup( state ){
            return (meetupId) => {
                return state.LoadedMeetups.find((meetup) =>{
                    return meetup.id === meetupId
                });
            }
        },
        users (state) {
            return state.users
        },
        error(state){
            return state.error
        },
        loading(state){
            return state.loading
        }
    }
})
