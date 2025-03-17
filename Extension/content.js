//=======================
// Model (Data Layer)
//=======================
const Model = {
  state: {
    ComPort: null,
    CurrentUser: null,
    LastUsername: "",
    SharedData: null,
    startedFollowLike: false,
    story_set: false,
    startDM: false,
    tag_dict: {},
    account_dict: {},
    image_src: "",
    logs: "",
    commented: false,
    pic_url: "",
    user_id: null
  },

  User: class {
    constructor(username, user_id, full_name, user_pic_url = "icon.png", followed_time = 0) {
      this.username = username;
      this.user_id = user_id;
      this.full_name = full_name;
      this.user_pic_url = user_pic_url;
      this.followed_time = followed_time;
    }
  },

  MediaTag: class {
    constructor(tag_name, cursor_key, eof) {
      this.tag_name = tag_name;
      this.cursor_key = cursor_key;
      this.eof = eof;
    }
  },

  // Data methods
  getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  },

  async getUserData(username) {
    const response = await fetch(`https://www.instagram.com/${username}/?__a=1`);
    return response.json();
  },

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

//=======================
// View (UI Layer)
//=======================
const View = {
  init() {
    this.injectUIElements();
  },

  injectUIElements() {
    $('body').prepend(`
      <div id="inject"></div>
      <div id="timer"></div>
    `);
  },

  updateTimer(seconds) {
    $('#timer').html(`${seconds.toFixed(0)} seconds till next action`);
  },

  updateStatus(message) {
    $('#inject').html(message);
  },

  showError(message) {
    this.updateStatus(`<div class="error">${message}</div>`);
  },

  handleDOMInteraction(selector, eventType, callback) {
    $(document).on(eventType, selector, callback);
  }
};

//=======================
// Controller (Logic Layer)
//=======================
const Controller = {
  init() {
    this.initComPort();
    this.setupEventListeners();
    this.initialChecks();
  },

  initComPort() {
    Model.state.ComPort = chrome.runtime.connect({ name: "instafollow213content" });
    Model.state.ComPort.onMessage.addListener(this.handleMessage.bind(this));
  },

  initialChecks() {
    if (!Model.state.story_set && window.location.href.includes("stories")) {
      this.sendMessage("GetStory", "Error", "No Buttons");
    }
    if (!Model.state.startDM && window.location.href.includes("direct")) {
      this.sendMessage("GetDM", "Error", "No Buttons");
    }
  },

  setupEventListeners() {
    $(document).ready(() => {
      this.retrieveUserHeaders();
      View.handleDOMInteraction('button', 'click', this.handleButtonClick);
    });
  },

  // Message Handling
  handleMessage(message) {
    try {
      const handlers = {
        'FollowUser': this.handleFollowUser,
        'CollectFromAccount': this.handleCollectFromAccount,
        'GatherAccountTargets': this.handleGatherTargets,
        // Add all other message types here
      };

      if (handlers[message.Tag]) {
        handlers[message.Tag].call(this, message);
      }
    } catch (error) {
      this.handleError(error);
    }
  },

  sendMessage(tag, type, data) {
    Model.state.ComPort.postMessage({ Tag: tag, [type]: data });
  },

  // Core Functionality
  async handleFollowUser(message) {
    try {
      const userData = await Model.getUserData(message.User);
      this.sendMessage("UserFollowed", "User", userData);
      View.updateStatus(`Followed ${message.User}`);
    } catch (error) {
      View.showError(`Follow failed: ${error.message}`);
    }
  },

  handleCollectFromAccount(message) {
    const randomDelays = this.generateRandomDelays();
    this.collectAccountData(message.account_name, randomDelays);
  },

  handleGatherTargets(message) {
    const elements = document.getElementsByTagName("a");
    this.processTargetElements(elements);
  },

  // Helper Methods
  generateRandomDelays() {
    return {
      d: Model.getRandomInt(1e3, 2500),
      V: Model.getRandomInt(1e5, 25e4),
      M: Model.getRandomInt(1e5, 25e4),
      B: Model.getRandomInt(1e3, 2500),
      h: Model.getRandomInt(1e3, 1300),
      v: Model.getRandomInt(1800, 9e3)
    };
  },

  processTargetElements(elements) {
    for (const element of elements) {
      if (element.href?.includes("followers")) {
        element.click();
        setTimeout(() => this.processMutualFollowers(), 1000);
      }
    }
  },

  retrieveUserHeaders() {
    Model.state.CurrentUser = {
      CSRF: Model.getCookie("csrftoken"),
      user_id: Model.getCookie("ds_user_id")
    };
    this.sendMessage("CurrentUserUpdate", "User", Model.state.CurrentUser);
  },

  handleError(error) {
    console.error('Controller Error:', error);
    View.showError(error.message);
    this.sendMessage("SystemError", "Error", error.stack);
  }
};

// Initialize Application
Controller.init();
View.init();