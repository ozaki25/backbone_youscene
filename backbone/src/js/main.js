var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

$(function(){
    var Blog = Backbone.Model.extend({
        defaults: function() {
            return {
                title: "empty todo...",
                content: "empty content...",
                author: "テストユーザ",
                created_at: "",
                updated_at: ""
            };
        }
    });

    var BlogList = Backbone.Collection.extend({
        model: Blog,
        url: "/blogs"
    });
    var Blogs = new BlogList;

    var BlogView = Backbone.View.extend({
        tagName:  "div",
        template: _.template(
            '<div class="index-blog row">' +
                '<div class="index-title col-md-8">' +
                    '<a href="#">' +
                        '<%- title %>' +
                    '</a>' +
                '</div>' +
                '<div class="col-md-4 text-right">' +
                    '<ul class="list-inline">' +
                        '<li><%- author %></li>' +
                        '<li><%- updated_at %></li>' +
                    '</ul>' +
                '</div>' +
            '</div>'
        ),
        events: {
            "dblclick .view"  : "edit",
            "click a.destroy" : "clear",
            "keypress .edit"  : "updateOnEnter",
            "blur .edit"      : "close"
        },
        initialize: function() {
            console.log("blogs initialize");
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function() {
            console.log("blogs render");
            this.$el.html(this.template(this.model.toJSON()));
            this.input = this.$('.edit');
            return this;
        },
        edit: function() {
            console.log("edit");
            this.$el.addClass("editing");
            this.input.focus();
        },
        close: function() {
            console.log("close");
            var value = this.input.val();
            if (!value) {
                this.clear();
            } else {
                this.model.save({title: value, content: value});
                this.$el.removeClass("editing");
            }
        },
        updateOnEnter: function(e) {
            console.log("updateOnEnter");
            if (e.keyCode == 13) this.close();
        },
        clear: function() {
            console.log("clear");
            this.model.destroy();
        }
    });

    var AppView = Backbone.View.extend({
        el: $("#main"),
        template: _.template(
            ' <div id="blog_list"></div>'
        ),
        events: {
            "keypress #new-todo":  "createOnEnter"
        },
        initialize: function() {
            console.log("app initialize");
            this.listenTo(Blogs, 'add', this.addOne);
            this.listenTo(Blogs, 'reset', this.addAll);
            //this.listenTo(Blogs, 'all', this.render);
            this.render();
            Blogs.fetch();
        },
        render: function() {
            console.log("app render");
            this.$el.html(this.template());
            return this;
        },
        addOne: function(blog) {
            console.log("addOne");
            var view = new BlogView({model: blog});
            this.$("#blog_list").append(view.render().el);
        },
        addAll: function() {
            console.log("addAll");
            Blogs.each(this.addOne, this);
        },
        createOnEnter: function(e) {
            console.log("createOnEnter");
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;
            Blogs.create({title: this.input.val(), content: this.input.val()});
            this.input.val('');
        }
    });
    var App = new AppView;
});
