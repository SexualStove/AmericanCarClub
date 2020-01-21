<template>
    <div class="blog">
        <div>
            <button style="display: inline-block" v-on:click="SortNewBlogs">New Order</button>
            <input v-on:change="SortNewBlogs" style="display: inline-block" id="SearchBlog" type="text" placeholder="Search">
        </div>
        <div>

        <div style="transition: 1s" v-for="blog in this.ShownBlogs" v-bind:key="blog.thumbnail" >
            <transition name="BlogLoad" :key="blog.thumbnail">
            <div style="transition: 1s" class="BlogPost" v-if="blog.Type < TotalBlogSize">

                <img class="Thumbnail" v-bind:src="blog.Thumbnail" alt="../assets/images/BrokenImage.png">
                <div class="BlogContent">
                    <div class="AuthorDate">
                        <h3 class="BlogAuthor">By: {{blog.Author}}</h3>
                        <h3 class="BlogAuthor">{{blog.Date}}</h3>
                    </div>
                    <router-link tag="div" v-bind:to="'/Blog/'+blog.id">
                        <h1 class="BlogTitle">{{blog.Title}} </h1>
                    </router-link>
                    <h2 class="BlogBlurb">{{blog.Blurb}}</h2>

                </div>
            </div>
            </transition>
        </div>

        </div>





    </div>
</template>

<script>
    import BlogController from '@/services/BlogServices'


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
            }
        },
        methods: {
            async getBlogs() {
                try {

                    const blogs = await BlogController.getAll();

                    console.log(blogs.data.Blogs);
                    this.blogs = blogs.data.Blogs;
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
                    if((this.ShownBlogs[i].Title.includes(SearchText) || this.ShownBlogs[i].Blurb.includes(SearchText))) {
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
        width: auto;
        max-width: 30vw;
        min-height: 17vw;
        height: auto;
        max-height: 19vw;
        horiz-align: center;
        margin: 2vw 3vw 2vw 3vw;
        align-self: center;
        justify-self: center;
    }
    .ImageContent {
        width: 30vw;
        height: 19vw;
    }
    .BlogPost {
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
    .AuthorDate {
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
        font-family: 'Big Shoulders Text', cursive;
        font-size: 3vw;

    }
    .BlogTitle:hover {
        cursor: pointer;
        text-underline: black dash-dot-dot-heavy;
        text-shadow: 4px 4px #859e30;
    }

    .BlogContent {
        margin-top: 1vw;
        width: 36vw;

        line-height: 1.1;
    }
    .BlogBlurb {
        font-family: 'Montserrat', sans-serif;
        text-align: left;
        font-size: 1.3vw;
        font-weight: 500;
        max-height: 1vw;
    }
    .blog {
        background-color: #dadbe0;
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

</style>
