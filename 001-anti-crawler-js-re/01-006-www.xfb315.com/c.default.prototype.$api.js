// 在getDetail传进来的前四个参数是（再后面我也没记，应该不重要吧...）：
// arguments[0] = "post"
// arguments[1] = "TousuDetail"
// arguments[2] = {"id": "94739696"}
// arguments[3] = 获取到数据之后的回调函数
c.default.prototype.$api = function(e, n, data, t, o, r) {
    var c = this
        , d = {}
        , _ = {};
    switch (e) {
        case "put":
        case "post":
            d = data;
            break;
        case "get":
            (_ = data)._t = ht++;
            break;
        case "delete":
            _ = data
    }
    if (-1 != ["BrandInfoToplist", "getMultipleTopList", "getToplistTag", "getBrandTopList", "Search", "adsList"].indexOf(n) || n !== c.$store.state.repeated) {
        if (c.$store.state.repeated = n,
        void 0 === o) {
            if (vt <= 0) {
                ["TousuCommentList", "ArticleDetail"].includes(n) && (c.$store.state.detailLoading = !0),
                    c.$store.state.isloading = !0
            }
            vt++
        }
        if (!["SendSms", "TopicDetails", "ArticleDetail", "UploadPic", "TopicAnswerAdd", "TopicAdd", "cluesCreate", "Create", "UploadHeadImg", "TousuAddComment", "TousuReplenish", "TousuAppraise", "BulterStoreNew", "TopicCommentAdd", "TopicAnswerList", "predictionInfo", "predictionAdd", "predictionShare", "agreementAppeal", "getApplyInfo", "addApply", "updateApply"].includes(n) && Object.keys(data).length > 0) {

            // n是TousuDetail，并不在白名单内，所以它的参数需要被加密
            // 传进来的{"id": "94739696"}显示被序列化为json字符串
            var l = JSON.stringify(data)
                ,
                // 创建了一个RSA加密的对象
                A = new JSEncrypt;
            // 为其设置公钥，这个是写死在上面的，不确定会不会随着时间而变化 2020-11-17 19:39:04
            // ........
            // lt = "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA6j0DsaBPHiW4GOAOihZL0jzh7seoj8IKlRSj3fj6TJked/OAhC7Q0AdVdHIeXQrEQ2Y2z6BSul0gkNi0rg+b2Ugf8dZG3qGe7gyv1midmTZgmIdgr17VlYPpo0HRMu+2K3u/lpfeVInyR9IWv+0z6+PztcxnlmcxH/if4GKFVFacpM6U2iPgLRbqlLafASMGW4VpffPGLYLCR9x69FgJJLsMqfbqsqwZEWOl/eEoS846D6mQmh7Wm8XtFwbDGjFgGrExA6tFl17DxbLJZIQvnmezG4jN5pxcDZX+ViuFhJNA0CIvA/nlnkd80mZMEkHKLF6MtxzuZZPMb9YRZyhgk0gy+5P7rlFP1jDj9aHbgB79ZFQwdsmrtRUuPWk6VwtwUXcn8AyanFrB+Y4Ti9M0ReQl+qV96ANbcZxberBfjsPZ/2g34ei1yYKqTZZu6AYnK42hAQ0Fx2toVHH7JUY3FO1Hnz6v4eZXr0+6x6EwKSV1B1xHwTIkJ8AW2kJYfgARFpPLGWvrDEom1IrAVe0VEBR9BNrplF8sNptyl7IQjChtePD7MKTY4ZoURmJihNF59zIdwDcnYSJ2zA615L0iYW7yJlRNNfVVZJLkhjoIiJOx5rj8ZI+OowFtdWXfvz5aC5clqd3SNvBZw+aRsD8f+CIoALPTrNr4dTNrzapDnM8CAwEAAQ=="
            // ........
            //  var mt = lt
            A.setPublicKey(mt);
            // 然后把转为json字符串的参数加密传进去
            // 就是前面看到的请求里样子了
            var m = {
                // 在这个地方打断点，然后鼠标移到encrypt上，跟进去
                code: A.encrypt(l)
            };
            // 序列化
            d = yt.stringify(m, {
                arrayFormat: "indices"
            })
        }
        c.$store.commit("setRetryCount", 0),
            c.$store.commit("setErrorCount", 0),
            this.$axios({
                method: e,
                url: ut.a[n],
                baseURL: c.$apiurl,
                data: d,
                params: _,
                responseType: "json",
                validateStatus: function(e) {
                    return e >= 200 && e < 300
                },
                paramsSerializer: function(e) {
                    return yt.stringify(e, {
                        arrayFormat: "indices"
                    })
                },
                transformResponse: [function(data) {
                    return "string" == typeof data ? JSON.parse(data) : data
                }
                ]
            }).then((function(data) {
                    if (c.$nextTick((function() {
                            c.$store.state.repeated = "",
                            void 0 === o && --vt <= 0 && (c.$store.state.detailLoading = !1,
                                c.$store.state.isloading = !1)
                        }
                    )),
                    data.data.msg_type && 200 === data.data.msg_type)
                        t(data.data);
                    else if (data.data.msg_type && 203 === data.data.msg_type)
                        c.$router.replace("/busy");
                    else {
                        if (data.data.msg_type && 15 === data.data.msg_type) {
                            if ("Favours" === n)
                                return;
                            return void c.$store.commit("showEntrance", "login")
                        }
                        if (["complainHelp", "TousuResultZan", "TousuAddCollects", "TopicZanAdd", "TopicCollectAdd", "ArticleUserful"].includes(n) && 40001 === data.data.msg_type)
                            return t(data.data),
                                void c.$message(data.data.msg, "warning");
                        if (r)
                            return void r(data.data);
                        if (data.data.msg_type && 500 === data.data.msg_type)
                            return void c.$message("服务繁忙，请稍后再试！", "warning");
                        if (data.data.msg_type && 401 === data.data.msg_type)
                            return c.$message("浏览更多内容请登录！", "warning"),
                                void c.$store.commit("showEntrance", "login");
                        c.$message(data.data.msg, "warning")
                    }
                }
            ))
    }
}
;