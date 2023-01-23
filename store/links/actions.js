// import axios from 'axios'

// export default {
//   async getLinks({ commit }) {
//     // console.log('getting links in actions')

//     try {
//       const { data } = await axios.get('https://tsota.herokuapp.com/lessons')
//       // const linksData = data.map((link) => {
//       //   return {
//       //     id: link.id,
//       //     title: link.attributes.title,
//       //     order_num: link.attributes.order_num
//       //   }
//       // })
//       // console.log(linksData)
//       // commit('setLinks', linksData)
//       commit('setLinks', data)
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }
