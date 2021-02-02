<template>
  <v-row>
    <v-col>
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
                    <v-card-title class="pa-0">{{ task.name }}</v-card-title>
                  </v-col>

                  <v-col class="pa-0" cols="12" sm="7">
                    <v-card-text class="pa-0" v-show="descriptionEmpty">
                      {{task.text}}
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <v-col cols="12" sm="3" md="2" lg="1">
              <div>
                <v-container>
                  <v-row v-if="!!this.task.date">
                    <v-col class="pa-0" align-self="center">
                      <div
                        class="text-subtitle-1 text-center"
                        v-bind:class="this.expireDate < new Date()? 'red--text' : ''"
                      >
                        <v-icon>mdi-calendar</v-icon>
                        {{ this.task.date }}
                      </div>
                    </v-col>
                  </v-row>

                  <v-row v-if="!!this.task.time">
                    <v-col class="pa-0">
                      <div class="text-subtitle-1 text-center">
                        <v-icon>mdi-clock</v-icon>
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
    </v-col>
  </v-row>
</template>

<style scoped>
.action {
  text-align: center;
  align-items: center;
  align-self: stretch;
}
</style>

<script>
import storageUtils from "~/utils/storage.js";
import timeUtils from "~/utils/time.js";

export default {
  data() {
    return {
      descriptionEmpty: true,
      expireDate: null,
    };
  },

  //eseguito al momento della creazione del componente
  mounted() {
    console.log(this.id);
    if (this.task.text == "" || this.task.text == null)
      this.descriptionEmpty = false;

    console.log(this.task.name);
    this.expireDate=this.date();
  },

  props: {
    task: {},
    id: Number,
  },

  computed: {
    checkedReactive: {
      get() {
        return this.task.checked;
      },
      set(val) {
        storageUtils.checkTask(this.id, val);//metti ID
      },
    },
  },

  methods: {
    remove() {
      this.$emit("removed", this.id);
    },

    checkExpired(){//TODO
    },


    date() {
      var completeDate;
      if (this.task.date==null && this.task.time==null)
        return;

      var year, month, day;
      if(!!this.task.date){
        var date=this.task.date.split("-");
        console.log(date);
        year=parseInt(date[0]);
        month=parseInt(date[1]-1);
        day=parseInt(date[2]);
      }
      else{
        year = new Date().getFullYear();
        month = new Date().getMonth();
        day = new Date().getDay();
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

      console.log(new Date() + "---" + completeDate);
      return completeDate; 
    },
  },
};
</script>