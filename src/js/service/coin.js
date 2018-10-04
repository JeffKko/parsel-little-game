const saveAward = function({rid, type}) {
  $.ajax({
    url: `https://b3589481400.rapi.dev5.ruten.com.tw/api/coin/v1/deposit`,
    dataType: 'json',
    type: 'POST',
    data: {
      'ctrl_rowid': rid,
      'ref_event': type
    },
    xhrFields: {
      withCredentials: true
    },
    success: function(res) {
      console.log(res)
    },
    error: function(res) {
      console.log(res)
    }
  })
}

const checkPermission = function (userNick, type) {
  $.ajax({
    url: `https://b3589481400.rapi.dev5.ruten.com.tw/api/users/v1/${userNick}/coin/permission`,
    dataType: 'json',
    type: 'GET',
    data: {
      'ref_event': type
    },
    xhrFields: {
      withCredentials: true
    },
    success: function(res) {
      console.log(res)
    },
    error: function(res) {
      console.log(res)
    }
  })
}

const checkLogin = function () {
  $.ajax({
    url: '',
    dataType: 'json',
    type: 'POST',
    data: {
    },
    xhrFields: {
      withCredentials: true
    },
    success: function(res) {
      if(!res) {
        location.href = 'https://b3589481400.member.dev2.ruten.com.tw/user/login.htm?refer='+window.encodeURIComponent(window.location.href)
      } else {
        // vm.user.rid = common.GetCookie('bid_rid')
        // vm.user.name = res.user_nick
        // vm.checkPermission()
      }
    },
    error: function(res) {
      location.href = 'https://b3589481400.member.dev2.ruten.com.tw/user/login.htm?refer='+window.encodeURIComponent(window.location.href)
    }
  })
}

export {
  saveAward,
  checkPermission,
  checkLogin
}