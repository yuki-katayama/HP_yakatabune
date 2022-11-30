<script setup lang="ts">
import { ref, onMounted } from "vue";
import moment from "moment";
import JapaneseHolidays from "japanese-holidays";

interface Calendar {
	day: number;
	month: string;
}

const currentDate = ref<moment.Moment>(moment());
const monthFormat = "YYYY-MM"

const calendars = computed(() => {
	return getCalendar();
})

const displayMonth = computed(() => {
	return currentDate.value.format('YYYY[年]M[月]');
})

const currentMonth = computed(() => {
	return currentDate.value.format(monthFormat);
})

onMounted(() => {
	JapaneseHolidays.isHoliday(new Date())
});

/* 初めの週の日曜日を取得 */
const getStartDate = () => {
	let date = currentDate.value.clone()
	const youbiNum = date.day();
	return date.subtract(youbiNum, "days")
}

/* 最後の週の土曜日を取得 */
const getEndDate = () => {
      let date = moment(currentDate.value);
      date.endOf("month");
      const youbiNum = date.day();
      return date.add(6 - youbiNum, "days");
}

const getYoubi = (dayIdx: number): string => {
	const week = ['日', '月', '火', '水', '木', '金', '土']
	return week[dayIdx];
}

/* 有効な日付かどうかを確認 */
const isActiveDate = (yearMonth: string, day: number): boolean => {
	if (currentMonth.value !== yearMonth) {
		/** 同じ月かどうか */
		return false;
	} else if (day < currentDate.value.get('date')) {
		/** 現在の日付を超えているのか */
		return false;
	}
	return true;
}

/* 有効な日付の場合の色を返す */
const getYoubiColor = (youbi: string): any => {
	let color = {color: ""}
	if (youbi === '日') {
		color.color = '#EB5656'
	} else if (youbi === '土') {
		color.color = '#558ED7'
	} else {
		color.color = '#000000'
	}
	return color;
}

/* セルの色を返す */
const getCelColor = (youbi: string, month: string, day: number): any => {
	let color = {color: "#767676"}
	if(isActiveDate(month, day)) {
		color = getYoubiColor(youbi)
	}
	return color;
}

/* １ヶ月の日数を取得 */
const getCalendar = () => {
	const endDate = getEndDate();
    let calendarDate = getStartDate();
	/* カレンダーの行数計算 */
    const weekNumber = Math.ceil(endDate.diff(calendarDate, "days") / 7);

    let calendars: Calendar[][] = [];
    for (let week = 0; week < weekNumber; week++) {
      let weekRow: Calendar[] = [];
      for (let day = 0;  day < 7; day++) {
        weekRow.push({
          day: calendarDate.get("date"),
		  month: calendarDate.format(monthFormat),
        });
        calendarDate.add(1, "days");
      }
      calendars.push(weekRow);
    }
    return calendars;
}

const nextMonth = () => {
	currentDate.value = moment(currentDate.value).subtract(1, "month");

}

const prevMonth = () => {
	currentDate.value = moment(currentDate.value).add(1, "month");
}

</script>

<template>
	<div class="calendar">
		<div class="month">
			<button @click="prevMonth">←</button>
			<h2>カレンダー{{ displayMonth }}</h2>
			<button @click="nextMonth">→</button>
		</div>
	  <div class="calendar">
		<div class="calendar-weekly">
			<div class="calendar-youbi" :style="getYoubiColor(getYoubi(n-1))" v-for="n in 7" :key="n">
				{{ getYoubi(n-1) }}
			</div>
		</div>
		<div
		class="calendar-weekly"
		v-for="(week, index) in calendars"
		:key="index"
		>
			<div
				class="calendar-daily"
				v-for="(day, index) in week"
				:style="getCelColor((getYoubi(index - 1)), day.month, day.day)"
				:key="index"
			>
				<div class="calendar-day">
					{{ day.day }}
				</div>
				<div class="calendar_value">
					<div v-if="!isActiveDate(day.month, day.day)">
						-
					</div>
					<div v-else class="calendar_value_active">
						●
					</div>
				</div>
			</div>
		</div>
	  </div>
	</div>
  </template>

<style lang="scss">

.calendar{
  width:100%;
  height: 100%;
}

.calendar_value {
	font-size: 3rem;
	text-align: center;
	&_active {
		// color: $calendar
		color: #F3AD3D
	}
}

.outside {
	color: white !important;
	background-color: green
}

.month{
  margin:0.5em 0;
  display: flex;
  justify-content: space-between;
  h2 {
	font-size: 2rem;
  }
  button{
	padding:4px 8px;
	margin-right:8px;
	}
}

.calendar-youbi{
  flex:1;
  margin-right:-1px;
  text-align:center;
}

.calendar-weekly{
  display:flex;
  /* background-color: black; */
}
.calendar-daily{
  flex:1;
  margin-right:-1px;
}
.calendar-day{
  text-align: center;
}
</style>