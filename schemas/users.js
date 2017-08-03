/**
 * Created by Administrator on 2017/6/16.
 */

var mongoose = require('mongoose');
//用户的表结构
module.exports = new mongoose.Schema({
    //用户名
    username: String,
    //密码
    password: String,
    //是否管理员
    isAdmin: {
        type: Boolean,
        default: false
    },
    userpic:{
        type: String,
        default: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAyADIDAREAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAQDBQIJ/8QALRAAAgEDAgQDCAMAAAAAAAAAAQIDAAQRBSESMUFhMlFxBhMiQlJygaEjJEP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQP/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREh/9oADAMBAAIRAxEAPwD7GVozKBQKBQKBQKABk4AJJ5AdaDpy29poZ93cRm8ux40DlIoT9JI3Zh1wQB3qK8JeafdngmszaZ5S27s3D6qxOR6EGnTibULB9NujE5VtgyupysincMOxFVGFAoFBf7LAH2jssgH+UEA8s9P3ipViAszsSxJYnJJ5k9aqFB0NSy2h6WW8YWVR9gfb9lqLXPohQKD1DM1tMkiHheNgynyIORQWa7bq04vIR/WvCXXH+b/Mh7g/oipFqayspNRukhiGXc432CjqSegA3Jqo31u7jubtUgJa3tkEMR5cQHNvyST+aFR0CgcqDpJZQaREsl6hmndQ0dsDwgA8mkI3GeijfzxUVPf6vPqKKjmNIUOUijQIiHsB17neriays72XT7gSwuY5ACMjyPMdxQWrcWut/BMkVldHwzIOGJz5Ovy/cNvMVFQ3VrJY3LwzIY5YzhlPQ1UZ0G+m3EdnfxSyx++SM8XB0YjlntnGaDKed7qd5ZGLySMWZjzJNB5oFAoKb3UBe2dsrKTNbgxl/rT5R6jcemPKgmoFAoFAoFAoFB//2Q=='
    }
});