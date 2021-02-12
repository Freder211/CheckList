<template>
  <div class="card">
      <v-card>
        <v-container>
          <v-row align="center">
            <v-col>
              <v-container class="fluid">
                <v-row align="center" justify="center">
                  <v-col class="pa-0" cols="2" sm="1">
                    <div class="action">
                      <v-checkbox v-model="checkedReactive"></v-checkbox>
                    </div>
                  </v-col>

                  <v-col class="pa-0" cols="10" sm="4">
                    <v-card-title
                      class="pa-0"
                      v-bind:class="this.textCssClass()"
                    >
                      {{ task.name }}
                    </v-card-title>
                  </v-col>

                  <v-col class="pa-0" cols="12" sm="7">
                    <v-card-text class="pa-0" v-show="descriptionEmpty" v-bind:class="this.textCssClass()">
                      {{task.text}}
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <v-col cols="12" sm="3" md="2" lg="1">
              <div>
                <v-container>
                  <v-row v-if="!!this.task.date || !!this.task.time">
                    <v-col class="pa-0" align-self="center">
                      <div
                        class="text-subtitle-1 text-center"
                        v-bind:class="this.textCssClass()"
                      >
                        <v-icon
                          :color="this.isExpired && !this.checked ? 'red' : 'default'"
                        >
                            mdi-calendar
                        </v-icon>
                        {{this.smartDate}}
                      </div>
                    </v-col>
                  </v-row>

                  <v-row v-if="!!this.task.time">
                    <v-col class="pa-0">
                      <div
                        class="text-subtitle-1 text-center"
                        v-bind:class="this.textCssClass()"
                      >
                        <v-icon
                          :color="this.isExpired && !this.checked ? 'red' : 'default'"
                        >
                          mdi-clock
                        </v-icon>
                        {{ this.task.time }}
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-col>

            <v-col cols="12" sm="2" md="1" align-self="stretch" class="pa-0">
              <v-btn
                color="red"
                block
                min-height="50"
                height="100%"
                rounded
                tile
                @click="remove"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
  </div>
</template>

<style scoped>
.action {
  text-align: center;
  align-items: center;
  align-self: stretch;
}

.card{
  width: 100%;
  transition: all 1s;
  display: inline-block;
}
</style>

<script>
import storageUtils from "~/utils/storage.js";

export default {
  data() {
    return {
      descriptionEmpty: true,
      expireDate: null,
      isExpired: false,
      now: new Date(),
      smartDate: null,

      show: false,
      checked: this.task.checked,
    };
  },

  
  mounted() {
    this.show=true;
    if (this.task.text == "" || this.task.text == null)
      this.descriptionEmpty = false;

    this.expireDate=this.date();
    this.smartDate=this.task.date;
    if(this.task.date || this.task.time){
      this.checkExpired();
      this.checkSmartDate();

      window.setInterval(() => {
          this.checkExpired();
          this.checkSmartDate();
      }, 10000);
    }
  },

  props: {
    task: {},
  },

  computed: {
    checkedReactive: {
      get() {
        return this.task.checked;
      },
      set(val) {
        storageUtils.checkTask(this.task.id, val);
        this.checked = val;
      },
    },
  },

  methods: {
    textCssClass(){
      var css = {
        'red--text':this.isExpired,
      };
      if(this.checked)
        css = {
          'text-decoration-line-through': this.checked,
          'text--disabled': true
        }
      return css;
    },

    remove() {
      this.show=false;
      this.$emit("removed", this.task.id);
    },

    checkExpired(){
      this.now = new Date();
      if(this.expireDate > this.now)
        this.isExpired=false;
      else
        this.isExpired=true;
    },

    checkSmartDate(){
      if(!this.task.date){
        this.smartDate='Today';
        return;
      }
      var daysDiff = this.expireDate.getDate() - this.now.getDate();
      if(
        this.now.getFullYear() == this.expireDate.getFullYear() &&
        this.now.getMonth() == this.expireDate.getMonth() &&
        Math.abs(daysDiff) < 7
      )
      {
        if(daysDiff==0)
          this.smartDate="Today"
        else if (daysDiff==1)
          this.smartDate="Tomorrow"
        else if (daysDiff==-1)
          this.smartDate="Yesterday"
        else{
          var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          this.smartDate=week[this.expireDate.getDay()];
        }
      }
      else
        this.smartDate=this.task.date;
    },


    date() {
      if (this.task.date==null && this.task.time==null)
        return 0;

      var completeDate;
      var year, month, day;
      if(!!this.task.date){
        var date=this.task.date.split("-");
        year=parseInt(date[0]);
        month=parseInt(date[1]-1);
        day=parseInt(date[2]);
      }
      else{
        year = new Date().getFullYear();
        month = new Date().getMonth();
        day = new Date().getDate();
      }
      
      var hour, minute;
      if(!!this.task.time){
        var time = this.task.time.split(":");
        hour = parseInt(time[0]);
        minute = parseInt(time[1]);
        completeDate = new Date(year, month, day, hour, minute);
      }
      else{
        completeDate = new Date(year, month, day);
      }

      return completeDate; 
    },
  },
};
</script>