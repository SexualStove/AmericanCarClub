<template>
    <div class="blog">
        <div id="SearchOptions">
            <button v-on:click="SortNewBlogs" class="btn-shine">
                <span>Reverse Order</span>
            </button>
            <div class="search">
                <div>
                <input v-on:change="SortNewBlogs" style="display: inline-block" id="SearchBlog" type="text" placeholder="       Search . . ." required>
                </div>
            </div>
        </div>
        <div>

        <div v-on:click="ClickBlog(blog)" style="transition: 1s" v-for="blog in this.ShownBlogs" v-bind:key="blog.thumbnail" >
            <transition name="BlogLoad" :key="blog.thumbnail">
                <div style="transition: 1s" class="BlogPost" v-if="blog.Type < TotalBlogSize">
                    <img class="Thumbnail" v-bind:src="blog.Thumbnail" alt="../assets/images/BrokenImage.png">
                    <div class="BlogContent">
                        <div class="AuthorDate">
                            <h3 class="BlogAuthor">When: {{blog.When}}</h3>
                            <h3 class="BlogAuthor"> Where: {{blog.Where}}</h3>
                        </div>

                            <h1 class="BlogTitle">{{blog.Title}} </h1>
                        <h2 class="BlogBlurb">{{blog.Blurb}}</h2>
                    </div>
                    <div v-html="blog.Content" v-if="CurrentBlog === blog.id" id="ContentBlog" class="ContentBlog" >
                      <h4> {{innerHTML = blog.Content}}</h4>
                    </div>
                </div>
            </transition>

        </div>



        </div>





    </div>
</template>

<script>
    import BlogController from '@/services/BlogServices'
//document.getElementById('blog').innerHTML

    import JQuery from 'jquery';
    let $ = JQuery;


    export default {

        data() {
            return {
                myUrl: 'asdfb',
                blogContent:"",
                blogs: '',
                thumbnail: '',
                TotalBlogSize: 2,
                ShownBlogs: undefined,
                TransferBlogList: undefined,
                Reversed: false,
                CurrentBlog: undefined,
            }
        },
        methods: {
            ClickBlog(blog) {
                console.log("CLICKED");
                if(blog.id === this.CurrentBlog) {
                    this.CurrentBlog = undefined;
                } else {
                    this.CurrentBlog = blog.id;
                    console.log(document.getElementById('ContentBlog'));
                    document.getElementById('ContentBlog').innerHTML = blog.Content;
                }
                console.log(this.CurrentBlog);

            },

            async getBlogs() {
                try {

                    const blogs = await BlogController.getAll();
                    console.log('Got this');
                    console.log(blogs.data.Blogs);
                    this.blogs = blogs.data.Blogs;
                    this.ReRollBlogs();
                    this.ReRollBlogs();
                    this.thumbnail = this.blogs[9].Thumbnail.data;

                    // this.blogContent = blogData.data.blog.Content;
                    // document.getElementById('blog').innerHTML = this.blogContent
                } catch (e) {
                    console.log(e);
                    this.myUrl = e;
                }
            },

            async ReRollBlogs() {

                this.ShownBlogs = this.blogs.slice();
                this.SortNewBlogs();
            },
            SortNewBlogs: function() {
                this.ShownBlogs = this.blogs.slice();
                let BlogLength = this.ShownBlogs.length;
                let SearchText = document.getElementById('SearchBlog').value;
                if(this.Reversed) {
                    this.ShownBlogs = this.ShownBlogs.reverse();
                }
                this.Reversed = !this.Reversed;
                let FilterList = [];
                let i = 0;
                for(i=0; i < BlogLength; i++) {
                    if((this.ShownBlogs[i].Title.toLowerCase().includes(SearchText.toLowerCase()) ||
                      this.ShownBlogs[i].Blurb.toLowerCase().includes(SearchText.toLowerCase()))) {
                        FilterList.push(this.ShownBlogs[i]);
                        console.log("Added new chunk to list");
                        console.log(FilterList);
                    }
                }
                console.log(FilterList);
                this.ShownBlogs = FilterList.slice();
                for(i=0; i < this.ShownBlogs.length; i++) {
                    this.ShownBlogs[i]["Type"] = i;
                }
                this.TotalBlogSize = 2;

            }
        },
        beforeMount() {
            this.getBlogs()
        },

        computed: {

        },
        mounted() {
            var self = this;
            this.$nextTick(function(){
                window.addEventListener("scroll", function() {
                    self.Scrolled = document.documentElement.scrollTop;
                    if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
                        if(self.TotalBlogSize < self.blogs.length) {
                            self.TotalBlogSize += 1;
                        }
                    }
                })
            })
        }
    }
</script>
<style scoped>

    .Thumbnail {
      grid-area: Image;
        width: auto;
        max-width: 30vw;
        min-height: 17vw;
        height: auto;
        max-height: 19vw;
        horiz-align: center;
        margin: 2vw 3vw 2vw 3vw;
        align-self: center;
        justify-self: center;
        box-shadow:
          -50px -50px 0 -40px tomato,
          50px 50px 0 -40px tomato;

    }
    .ImageContent {
        width: 30vw;
        height: 19vw;
    }
    .OLD {
        display: inline-grid;
        grid-template-columns: 50% 50%;
        top: 0;
        margin: 2vw 0 2vw 0;
        min-width: 72.5vw;
        height: 23vw;

        box-shadow:  1px 10px 18px #888888;
        overflow: hidden; /* make sure it hides the content that overflows */
        text-overflow: ellipsis;
    }
    .BlogPost {
        overflow: hidden;
        position: relative;
        display: inline-grid;
        grid-template-columns: 50% 50%;
        //grid-template-rows: auto;
        grid-template-areas: "Image SmallInfo" "Content Content";
        margin: 2vw 0 2vw 0;
        max-width: 72.5vw;
        min-height: 23vw;
        border-radius: 20px;
        background-color: #D7CDCC;
        color: #363c5f;
        padding: 40px;
        text-align: left;
        flex-direction: column;
        justify-content: space-between;
        clip-path: polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%);
    }

    .BlogPost::after {
        content: '';
        position: absolute;
        display: block;
        width: 30px;
        height: 30px;
        background-color: #e1e1f2;
        top: 0;
        right: 0;
        border-bottom-left-radius: 20px;

    }
    .AuthorDate {
        transform: translate(-15vw, -3vw);
        position: relative;
        display: inline-grid;
        grid-template-columns: 50% 50%;
        width: 100%;
        left: 0;
    }
    .BlogAuthor {
        font-size: 1vw;
        color: dimgray;
        left: 0;
        text-align: left;
    }
    .BlogTitle {
        color: #100B00;
        text-align: left;
        transition: 1s;
        font-family: 'Cinzel', serif;
        font-size: 3vw;


    }
    .BlogTitle:hover {
        cursor: pointer;
        text-underline: black dash-dot-dot-heavy;
    }
    #ContentBlog {
      width: 100%;
      grid-area: Content;
    }

    .BlogContent {
        margin-top: 1vw;
        width: 36vw;
        grid-area: SmallInfo;
        line-height: 1.1;
        transition: 1s;
    }
    .BlogBlurb {
      font-family: 'Roboto', sans-serif;
        text-align: left;
        font-size: 1.3vw;
        font-weight: 500;
        max-height: 1vw;

    }
    .blog {
      background-color: #30011E;
    }
    .BlogLoad-enter-active {
        transition: all 1s ease;
    }
    .BlogLoad-leave-active {
        transition: all .8s;
    }
    .BlogLoad-enter, .BlogLoad-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: scale(0.1);
        -ms-transform: scale(0.1);
        -webkit-transform: scale(0.1);
        opacity: 0;
    }
















    .search {
        margin: 20px;
    }

    .search > h3 {
        font-weight: normal;
    }

    .search > h1,
    .search > h3 {
        color: white;
        margin-bottom: 15px;
        text-shadow: 0 1px #0091c2;
    }

    .search > div {
        display: inline-block;
        position: relative;
    }

    .search > div:after {
        content: "";
        background: #F8DFDD;
        width: 4px;
        height: 20px;
        position: absolute;
        top: 40px;
        right: 2px;
        transform: rotate(135deg);
        box-shadow: 1px 0 #0091c2;
    }

    .search > div > input {
        color: #F8DFDD;
        font-size: 16px;
        background: transparent;
        width: 25px;
        height: 25px;
        padding: 10px;
        border: solid 3px white;
        outline: none;
        border-radius: 35px;
        box-shadow: 0 1px #0091c2;
        transition: width 0.5s;
    }

    .search > div > input::placeholder {
        color: #F8DFDD;
        opacity: 1;
    }

    .search > div > input::-ms-placeholder {
        color: #F8DFDD;
    }

    .search > div > input::-ms-input-placeholder {
        color: #F8DFDD;
    }

    .search > div > input:focus,
    .search > div > input:valid {
        width: 250px;
    }


    button {
        position: relative;
        margin: 0;
        padding: 5px 12px;
        height: 60px;
        width: 150px;
        outline: none;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        text-transform: uppercase;
        background-color: #F8DFDD;
        border: 1px solid rgba(22, 76, 167, 0.6);
        border-radius: 10px;
        color: black;
        font-weight: 400;
        font-size: 20px;
        font-family: inherit;
        z-index: 0;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.02, 0.01, 0.47, 1);
    }
    button span {
        color: black;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.7px;
    }
    button:hover {
        animation: rotate 0.7s ease-in-out both;
    }
    button:hover span {
        animation: storm 0.7s ease-in-out both;
        animation-delay: 0.06s;
    }
    @keyframes rotate {
        0% {
            transform: rotate(0deg) translate3d(0, 0, 0);
        }
        25% {
            transform: rotate(3deg) translate3d(0, 0, 0);
        }
        50% {
            transform: rotate(-3deg) translate3d(0, 0, 0);
        }
        75% {
            transform: rotate(1deg) translate3d(0, 0, 0);
        }
        100% {
            transform: rotate(0deg) translate3d(0, 0, 0);
        }
    }
    @keyframes storm {
        0% {
            transform: translate3d(0, 0, 0) translateZ(0);
        }
        25% {
            transform: translate3d(4px, 0, 0) translateZ(0);
        }
        50% {
            transform: translate3d(-3px, 0, 0) translateZ(0);
        }
        75% {
            transform: translate3d(2px, 0, 0) translateZ(0);
        }
        100% {
            transform: translate3d(0, 0, 0) translateZ(0);
        }
    }

    .btn-shine {
        border: 1px solid;
        overflow: hidden;
        position: relative;
        justify-self: center;
        align-self: center;
    }
    .btn-shine span {
        z-index: 20;
    }
    .btn-shine:after {
        background: tomato;
        content: "";
        height: 155px;
        left: -75px;
        opacity: 0.4;
        position: absolute;
        top: -50px;
        transform: rotate(35deg);
        transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
        width: 50px;
        z-index: -10;
    }
    .btn-shine:hover:after {
        left: 120%;
        transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    }
    .inspire a {
        text-decoration: none;
    }

    #SearchOptions {
        display: grid;
        grid-template-columns: 50% 50%;
        justify-self: center;
        align-self: center;
        margin: 5% 25% 0 25%;
    }

</style>
