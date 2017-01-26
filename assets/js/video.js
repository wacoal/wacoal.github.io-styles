(function($) {
  $.fn.rVideo = function(opts = {}) {
    const options = $.extend({}, {
      maxHeight: 500,
      wrap: false,
      autoPlay: false,
      loaded: null
    }, opts);

    const isFullscreenAPI = () => {
      const div_ = document.createElement('div');
      return div_.requestFullscreen || div_.mozRequestFullScreen || div_.webkitRequestFullscreen || div_.msRequestFullscreen;
    };

    const isIOS = () => {
      const ua_ = navigator.userAgent;
      return ua_.indexOf('iPhone') != -1 || ua_.indexOf('iPod') != -1 || ua_.indexOf('iPad') != -1;
    };

    if (!isFullscreenAPI() || isIOS()) {
      //フルスクリーン未サポートまたはiOSはブラウザデフォルトのコントローラを使用
      this.attr('controls', '');
      this.css('max-height', `${options.maxHeight}px`);
      return;
    } else {
      //55オリジナルUIを表示
      $('.video-container').removeClass('no-controls');
    }

    return this.each(function() {
      const video = this;
      const $video = $(this);

      if (options.wrap) {
        $video.wrap($('<div class="video-container"></div>'));
        $video.before($('<div class="video-start-btn"><img src="/img/video/start.png" alt="play"></div>'));
        $video.after($('<div class="video-controls">' +
                         '<button type="button" class="video-btn video-btn_play">' +
                          '<img src="/img/video/icon_play.png" alt="play" class="video-icon_play">' +
                           '<img src="/img/video/icon_pause.png" alt="pause" class="video-icon_pause">' +
                         '</button>' +
                         '<div class="video-progress-wrapper">' +
                           '<div class="video-progress">' +
                             '<div class="video-seek-bar">' +
                               '<div class="video-elapsed">' +
                                 '<div class="video-seek-click-area">' +
                                   '<div class="video-seek-btn"></div>' +
                                 '</div>' +
                               '</div>' +
                             '</div>' +
                           '</div>' +
                           '<span class="video-timer">00:00</span>' +
                         '</div>' +
                         '<div class="video-volume-wrapper">' +
                           '<button type="button" class="video-btn video-btn_volume">' +
                             '<img src="/img/video/icon_volume_max.png" alt="max" class="video-icon_volume-max">' +
                             '<img src="/img/video/icon_volume_middle.png" alt="middle" class="video-icon_volume-middle">' +
                             '<img src="/img/video/icon_volume_min.png" alt="min" class="video-icon_volume-min">' +
                             '<img src="/img/video/icon_mute.png" alt="mute" class="video-icon_volume-mute">' +
                           '</button>' +
                           '<div class="video-volume">' +
                             '<div class="video-volume-bar">' +
                               '<div class="video-volume-val">' +
                                 '<div class="video-volume-click-area"></div>' +
                               '</div>' +
                             '</div>' +
                           '</div>' +
                         '</div>' +
                         '<button type="button" class="video-btn video-btn_fullscreen">' +
                           '<img src="/img/video/icon_fullscreen.png" alt="fullscreen">' +
                         '</button>' +
                       '</div>'));
      }

      const $container = $video.parent($('.video-container'));
      const $startBtn = $('.video-start-btn', $container);
      const $playBtn = $('.video-btn_play', $container);
      const $seekBar = $('.video-seek-bar', $container);
      const $elapsed = $('.video-elapsed', $container);
      const $seekClickArea = $('.video-seek-click-area', $container);
      const $seekBtn = $('.video-seek-btn', $container);
      const $timer = $('.video-timer', $container);
      const $volumeBtn = $('.video-btn_volume', $container);
      const $volumeBar = $('.video-volume-bar', $container);
      const $volumeVal = $('.video-volume-val', $container);
      const $volumeClickArea = $('.video-volume-click-area', $container);
      const $fullScreenBtn = $('.video-btn_fullscreen', $container);

      $container.on('contextmenu', function() {
        return false;
      });

      video.addEventListener('loadedmetadata', function() {
        $seekClickArea.width($seekBar.width());

        $elapsed.width('0%');
        $seekBtn.css({
          'display': 'block',
          'left': '0px'
        })

        $timer.text(videoTimeFormat(video.duration));
        if (video.paused) {
          playStyle();
        }

        if (options.loaded) {
          options.loaded();
        }

        if (options.autoPlay) {
          video.play();
        }
      }, false);

      video.addEventListener('click', function() {
        playSwitch();
      }, false);

      $startBtn.on('click', function() {
        pauseStyle();
        video.play();
      });

      $playBtn.on('click', function() {
        playSwitch();
      });

      const playSwitch = function() {
        if (video.paused) {
          video.play();
          // pauseStyle();
        } else {
          video.pause();
          // playStyle();
        }
      };

      const playStyle = function() {
        $playBtn.children().hide();
        $playBtn.children('.video-icon_play').show();
        $startBtn.show();
      }

      const pauseStyle = function() {
        $playBtn.children().hide();
        $playBtn.children('.video-icon_pause').show();
        $startBtn.hide();
      }

      video.addEventListener('play', function() {
        pauseStyle();
      }, false);

      video.addEventListener('pause', function() {
        playStyle();
      }, false);

      video.addEventListener('timeupdate', function() {
        const progress_ = setSeekBar();

        const seekBarWidth_ = $seekBar.width() - $seekBtn.width();
        $seekBtn.css('left', Math.floor(seekBarWidth_ * progress_ / 100) + 'px');

        if (!seekButtonDown && 100 <= progress_ && video.paused) {
          playStyle();
        }
      }, false);

      const setSeekBar = function() {
        const progress_ = Math.floor(video.currentTime / video.duration * 100);
        $elapsed.width(progress_ + '%');

        $timer.text(videoTimeFormat(video.currentTime));
        return progress_;
      };

      const setSeekBtn = function(seekBarLeft) {
        let seekBtnLeft_ = seekBarLeft - $seekBtn.width() / 2;
        seekBtnLeft_ = (seekBtnLeft_ < 0) ? 0 : seekBtnLeft_;
        seekBtnLeft_ = ($seekBar.width() < (seekBtnLeft_ + $seekBtn.width())) ? ($seekBar.width() - $seekBtn.width()) : seekBtnLeft_;
        $seekBtn.css('left', seekBtnLeft_ + 'px');
      };

      $seekClickArea.on('click', function(e) {
        const left_ = e.clientX - $seekBar.offset().left;
        const progress_ = Math.round(left_ / $seekBar.width() * 100) / 100;
        $elapsed.width(progress_ * 100 + '%');

        setSeekBtn(left_);

        video.currentTime = video.duration * progress_;
      });

      $volumeBtn.on('click', function() {
        if (video.volume == 0) {
          return;
        }

        video.muted = !video.muted;
        saveData('videoMute', video.muted);
        volumeStyle();
      });

      $volumeClickArea.on('click', function(e) {
        volumeChange(e.clientX);
      });

      const volumeChange = function(clientX) {
        let left_ = clientX - $volumeBar.offset().left;
        left_ = (left_ < 0) ? 0 : left_;
        left_ = ($volumeBar.width() < left_) ? $volumeBar.width() : left_;

        const val_ = Math.round(left_ / $volumeBar.width() * 10) / 10;
        video.volume = val_;
        video.muted = (val_ == 0);
        saveData('videoVolume', val_);
        saveData('videoMute', video.muted);

        volumeStyle();
      };

      const volumeStyle = function() {
        $volumeVal.width(video.volume * 100 + '%');
        $volumeBtn.children().hide();
        if (video.muted) {
          $volumeVal.width(0);
          $volumeBtn.children('.video-icon_volume-mute').show();
        } else if (video.volume <= 0.3) {
          $volumeBtn.children('.video-icon_volume-min').show();
        } else if (video.volume <= 0.6) {
          $volumeBtn.children('.video-icon_volume-middle').show();
        } else {
          $volumeBtn.children('.video-icon_volume-max').show();
        }
      };

      const isFullscreen = function() {
        if (document.webkitFullscreenElement) {
          return document.webkitFullscreenElement;
        } else if (document.mozFullScreenElement) {
          return document.mozFullScreenElement;
        } else if (document.msFullscreenElement) {
          return document.msFullscreenElement;
        } else if (document.fullscreenElement) {
          return document.fullscreenElement;
        }
        return null;
      };

      let isThisVideoFullscreen = false;

      $fullScreenBtn.on('click', function() {
        if (isThisVideoFullscreen && isFullscreen()) {
          isThisVideoFullscreen = false;
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else {
            isThisVideoFullscreen = true;
            return false;
          }
        } else {
          isThisVideoFullscreen = true;

          const container_ = $container[0];
          if (container_.requestFullscreen) {
            container_.requestFullscreen();
          } else if (container_.mozRequestFullScreen) {
            container_.mozRequestFullScreen();
          } else if (container_.webkitRequestFullscreen) {
            container_.webkitRequestFullscreen();
          } else if (container_.msRequestFullscreen) {
            container_.msRequestFullscreen();
          } else {
            isThisVideoFullscreen = false;
            return false;
          }
        }
      });

      const resize = function() {
        setSeekBtn($elapsed.width());
        $seekClickArea.width($seekBar.width());

        volumeStyle();
      };

      const resizeFullscreen = function() {
        if (isThisVideoFullscreen && isFullscreen()) {
          $container.addClass('fullscreen');
          $video.css('max-height', `100%`);
        } else {
          $container.removeClass('fullscreen');
          $video.css('max-height', `${options.maxHeight}px`);
        }

        resize();
      };

      $(window).on('resize', function() {
        resize();
      });

      document.addEventListener('fullscreenchange', function() {
        resizeFullscreen();
      }, false);

      document.addEventListener('mozfullscreenchange', function() {
        resizeFullscreen();
      }, false);

      document.addEventListener('webkitfullscreenchange', function() {
        resizeFullscreen();
      }, false);

      document.addEventListener('MSFullscreenChange', function() {
        resizeFullscreen();
      }, false);

      let seekButtonDown = false;
      let clickSeekLeft;
      let isPaused = false;

      let volumeButtonDown = false;
      let clickVolumeLeft;

      $seekBtn.on('mousedown touchstart', function(e) {
        seekButtonDown = true;
        clickSeekLeft = e.clientX || e.originalEvent.touches[0].pageX;
        isPaused = video.paused;
        video.pause();
      });

      $volumeClickArea.on('mousedown touchstart', function(e) {
        volumeButtonDown = true;
        const x_ = e.clientX || e.originalEvent.touches[0].pageX;
        clickVolumeLeft = x_;
        volumeChange(x_);
      });

      $(document).on('mouseup touchend', function(e) {
        if (seekButtonDown) {
          if (!isPaused) {
            video.play();
          }
          seekButtonDown = false;

        } else if (volumeButtonDown) {
          volumeButtonDown = false;
        }
      });

      $(document).on('mousemove touchmove', function(e) {
        const x_ = e.clientX || e.originalEvent.touches[0].pageX;

        if (seekButtonDown) {
          const seekBarWidth_ = $seekBar.width() - $seekBtn.width();
          let seekButtonLeft_ = x_ - clickSeekLeft + parseInt($seekBtn.css('left'));
          clickSeekLeft = x_;

          seekButtonLeft_ = (seekButtonLeft_ <= 0) ? 0 : seekButtonLeft_;
          seekButtonLeft_ = (seekBarWidth_ <= seekButtonLeft_) ? seekBarWidth_ : seekButtonLeft_;
          $seekBtn.css('left', seekButtonLeft_ + 'px');

          video.currentTime = seekButtonLeft_ / seekBarWidth_ * video.duration;

          setSeekBar();

        } else if (volumeButtonDown) {
          volumeChange(x_);
        }
      });

      const initialize = function() {
        $video.css('max-height', `${options.maxHeight}px`);

        const volume_ = getData('videoVolume');
        const muted_ = getData('videoMute');
        video.volume = (volume_ == null) ? 1 : parseFloat(volume_);
        video.muted = ((muted_ == null) || (muted_ == 'false')) ? false : true;
        volumeStyle();
      };
      initialize();
    });
  };

  const videoTimeFormat = function(time) {
    const minute_ = Math.floor(time / 60);
    const second_ = Math.floor(time % 60);
    return ((minute_ < 10) ? '0' + minute_ : minute_) + ':' + ((second_ < 10) ? '0' + second_ : second_);
  };

  const saveData = (name, value) => {
    if (window.localStorage) {
      window.localStorage.setItem(name, value);
    } else {
      const date_ = new Date();
      date_.setTime(date_.getTime() + (365 * 24 * 60 * 60 * 1000));
      const expires_ = `; expires=${date_.toUTCString()}`;

      document.cookie = [name, '=', encodeURIComponent(value), expires_, '/', '', ''].join('');
    }
  };

  const getData = name => {
    if (window.localStorage) {
      return window.localStorage.getItem(name);
    } else {
      let result_ = null;
      if (document.cookie && document.cookie != '') {
        const cookies_ = document.cookie.split(';');
        for (let i = 0; i < cookies_.length; i++) {
          const cookie_ = $.trim(cookies_[i]);
          if (cookie_.substring(0, name.length + 1) == (`${name}=`)) {
            result_ = decodeURIComponent(cookie_.substring(name.length + 1));
            break;
          }
        }
      }
      return result_;
    }
  };

  // $.fn.rVideo.defaults = {};
})(jQuery);
