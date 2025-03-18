export class ExtensionModel {
    constructor() {
      this._comPort = null;
      this._follow_count_num = 0;
      this._following_count_num = 0;
      this._user_stats = [];
      this._last_ten_min = 1000000;
      this._last_ten_max = 0;
      this._user_email = "";
      this._postedInst = false;
      this._follow_speed = 0;
      this._emailed = false;
      this._enable_get_followers = false;
      this._unfollow_speed = 0;
      this._story_speed = 0;
      this._unfollowInstoo = false;
      this._post_stats = false;
      this._tiktok_data = [];
      this._hoursLeft = 8;
      this._twitter_data = [];
      this._like_speed = 0;
      this._follower_data = [];
      this._daily_data = [];
      this._blacklist = [];
      this._filters = [];
      this._minPhotos = 1;
      this._minFollowers = 100;
      this._minFollowing = 100;
      this._maxFollowers = 100000;
      this._maxFollowing = 100000;
      this._EnableFilters = false;
      this._update_interval = false;
      this._IdealTargets = [];
      this._addIdeal = true;
      this._follower_growth = 0;
      this._set_update = false;
      this._collectSelfFollowers = false;
      this._tiktok_speed = 0;
      this._twitter_speed = 0;
      this._facebook_speed = 0;
      this._unfollow_mode = false;
      this._DMMode = true;
      this._StartTime = "";
      this._AutoActions = [];
      this._analytics = [];
      this._startDate = "";
      this._chart_data = null;
      this._analytics_chart = null;
      this._stopDate = "";
      this._cal_events = [];
      this._activity_log = "";
      this._instooData = [];
      this._schedule_list = "";
      this._user_followers = [];
      this._calendar = null;
      this._chart3 = null;
      this._chart = null;
      this._chart2 = null;
      this._canvas = null;
      this._Duration = 8;
      this._logged_in = false;
      this._startedTutorial = false;
      this._likeCount = 0;
      this._myCollectJob = {};
      this._comment_speed = 0;
      this._global_settings = {};
      this._global_accounts = [];
      this._global_locations = [];
      this._started = false;
      this._my_followers = [];
      this._first = false;
      this._cloud_backup = false;
      this._start_license = 0;
      this._last_follow_count = 0;
      this._clicks = {};
      this._StartReact = false;
      this._StartSchedule = false;
      this._reacts = [];
      this._follow_val = false;
      this._like_val = false;
      this._comment_val = false;
      this._unfollow_val = false;
      this._user_cloud = true;
      this._UnfollowedPoolSize = 0;
      this._FollowedPoolSize = 0;
      this._LikePoolSize = 0;
      this._StoryPoolSize = 0;
      this._CommentPoolSize = 0;
      this._last_day = 0;
      this._day = 0;
      this._bar_follow = null;
      this._bar_like = null;
      this._bar_story = null;
      this._bar_comment = null;
      this._bar_unfollow = null;
      this._hashtag_dict = {};
      this._account_dict = {};
      this._counted_dict = {};
      this._clicks_dict = {};
      this._email_name = "";
      this._UnfollowAfterDays = 0;
      this._cloud_db = null;
      this._live_snapshots = [];
      this._live_tags = [];
      this._like_accounts = [];
      this._selectedAccount = "";
      this._loadedAccounts = false;
      this._updated_cloud = false;
    }
    
    // Example of using getters and setters more efficiently
    get comPort() {
      return this._comPort;
    }
  
    set comPort(value) {
      this._comPort = value;
    }
  
    get followCount() {
      return this._follow_count_num;
    }
  
    set followCount(value) {
      this._follow_count_num = value;
    }
  
    get followingCount() {
      return this._following_count_num;
    }
  
    set followingCount(value) {
      this._following_count_num = value;
    }
  }
  