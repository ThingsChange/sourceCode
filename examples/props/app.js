/* global Vue */

var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='

/**
 * Actual demo
 */
let abc= Vue.component('abc',{
  template:"<div><h1>123</h1><h2>{{testData}}</h2> {{a}}<button @click='childChange'>变</button>" +
    "<div>{{branches}}</div>" +
    "</div>",
  props:['testData','branches'],
  data(){
    return {
      a:1
    }
  },
  methods:{
    childChange(){
      // this.testData=0;
      this.a=2
      // this.branches.push(1);
      this.branches.dev.test=this.branches.dev.test+1;

    }
  }
})

new Vue({

  el: '#demo',

  data: {
    branches: {master:'master', dev: {test:1}},
    currentBranch: 'master',
    commits: null,
    testData:2,
    a:1,
    b:2
  },
  computed:{
    c(){
      console.log('这里是 123 的结果-------------', 123)
      return this.a+this.b
    },
/*    isChanged(){
      console.log('这里是 isCHanged 的结果-------------', 'isCHanged')
      return this.c === 3
    }*/
  },

  created: function () {
    this.fetchData()
  },
  mounted(){
    console.log('这里是 this 的结果-------------', this)
    setTimeout(()=>{
      this.a=2;
      this.b=1;
    },2000)
  },
  components:{
    abc
  },
  watch: {
    currentBranch: 'fetchData'
  },

  filters: {
    truncate: function (v) {
      var newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function (v) {
      return v.replace(/T|Z/g, ' ')
    }
  },

  methods: {
    changeData(){
      console.log('这里是 this.branches 的结果-------------', this.branches)
      // this.testData = this.testData+1;
    },
    fetchData: function () {
      var self = this
      if (navigator.userAgent.indexOf('PhantomJS') > -1) {
        // use mocks in e2e to avoid dependency on network / authentication
        setTimeout(function () {
          self.commits = window.MOCKS[self.currentBranch]
        }, 0)
      } else {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', apiURL + self.currentBranch)
        xhr.onload = function () {
          self.commits = JSON.parse(xhr.responseText)
          console.log(self.commits[0].html_url)
        }
        xhr.send()
      }
    }
  }
})
