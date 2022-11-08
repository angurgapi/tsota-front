import axios from 'axios'

export default {
  async getLinks({ commit }) {
    console.log('getting links in actions')

    try {
      const { data } = await axios.get('http://localhost:1337/api/lessons')
      const linksData = data.data.map((link) => {
        return {
          id: link.id,
          title: link.attributes.title,
          order_num: link.attributes.order_num
        }
      })
      console.log(linksData)
      commit('setLinks', linksData)
    } catch (error) {
      console.log(error)
    }
  }
}
