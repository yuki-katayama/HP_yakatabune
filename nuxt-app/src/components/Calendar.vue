<script setup lang="ts">
import { ref, onMounted, defineEmits, watch } from "vue";
import moment from "moment";
import JapaneseHolidays from "japanese-holidays";
// import { Calendar } from "models/models";

onMounted(() => {
});

/* 初めの週の日曜日を取得 */
const getStartDate = () => {
  let date = currentDate.value.clone();
  const youbiNum = date.day();
  date = date.subtract(youbiNum, "days")
  if (date.get("date") > 1 && date.get("date") < 7) {
    /* 日曜日が二日とかになる場合は、一週間前からスタート */
    date = date.subtract(7, "days")
  }
  return date
};

/* 最後の週の土曜日を取得 */
const getEndDate = () => {
  let date = moment(currentDate.value);
  date.endOf("month");
  const youbiNum = date.day();
  return date.add(6 - youbiNum, "days");
};

const getYoubi = (dayIdx: number): string => {
  const week = ["日", "月", "火", "水", "木", "金", "土"];
  return week[dayIdx];
};

const getMonthHolidays = (): JapaneseHolidays.Holiday[]  => {
	const holidays = JapaneseHolidays.getHolidaysOf(Number(currentDate.value.format("YYYY")));
  let monthHolidays: JapaneseHolidays.Holiday[] = [];
	holidays.forEach((holiday: JapaneseHolidays.Holiday) => {
		if (currentDate.value.get("month") + 1 === holiday.month) {
			monthHolidays.push(holiday)
		}
	});
	return monthHolidays;
}

const getHoliday =(month: number, day: number): JapaneseHolidays.Holiday | {name: ""}  => {
  const holiday = holidays.value.find((holiday: JapaneseHolidays.Holiday) =>
    holiday.month === month && holiday.date === day
  )
  console.log(holidays.value, month, day)
  if (holiday === undefined) {
    return {name: ""}
  }
  return holiday
}

const isHoliday = (date: moment.Moment, youbi: string): boolean => {
  if(JapaneseHolidays.isHoliday(new Date(date.format("YYYY-MM-DD")))) {
    return true;
  } else if (youbi === '日') {
    return true;
  }
  return false;
}

/* 有効な日付かどうかを確認 */
const isActiveDate = (date: moment.Moment): boolean => {
  if (currentDate.value.format('YYYY-MM') !== date.format('YYYY-MM')) {
    /** 同じ月かどうか */
    return false;
  } else if (moment().diff(date, 'days') > 0) {
    /** 現在の日付よりも前か */
    return false;
  }
  return true;
};

/**
 * @content 有効な日付の場合の色を返す
 * @description yymmddは日付の色を決定する時に入れる
 * */
const getDateColor = (youbi: string, date?: moment.Moment): any => {
  let color = { color: "" };
  if (youbi === "日" || (date && isHoliday(date, youbi))) {
    color.color = "#EB5656";
  } else if (youbi === "土") {
    color.color = "#558ED7";
  } else {
    color.color = "#000000";
  }
  return color;
};

/* セルの色を返す */
const getCelColor = (youbi: string, date: moment.Moment): any => {
  let color;
  if (isActiveDate(date) && !isHoliday(date, youbi)) {
    color = getDateColor(youbi, date);
  } else {
    color = getDateColor(youbi, date);
    color["background-color"] = "unset"
  }
  /* h以下を0でセットして正しい差分を取得 */
  const selectedTemp = moment(selected.value).hour(0).minutes(0).second(0).millisecond(0);
  if (selectedTemp.diff(date.format("YYYY-MM-DD")) === 0) {
    color['background-color'] = "#aaaaaa";
  }
  return color;
};

/* １ヶ月の日数を取得 */
const getCalendar = () => {
  const endDate = getEndDate();
  let calendarDate = getStartDate();
  /* カレンダーの行数計算 */
  const weekNumber = Math.ceil(endDate.diff(calendarDate, "days") / 7);

  let calendars: moment.Moment[][] = [];
  for (let week = 0; week < weekNumber; week++) {
    let weekRow: moment.Moment[] = [];
    for (let day = 0; day < 7; day++) {
      weekRow.push(moment(calendarDate.format("YYYY-MM-DD")))
      calendarDate.add(1, "days");
    }
    calendars.push(weekRow);
  }
  return calendars;
};

const nextMonth = () => {
	currentDate.value = moment(currentDate.value).add(1, "month");
};

const prevMonth = () => {
	currentDate.value = moment(currentDate.value).subtract(1, "month");
};

interface Emits {
	(e: "selectedDate", yyyymmdd: string): void;
}

const emits = defineEmits<Emits>();

const currentDate = ref<moment.Moment>(moment());
const selected = ref<moment.Moment>(moment());

const calendars = computed(() => {
  return getCalendar();
});

const displayMonth = computed((): string => {
  return currentDate.value.format("YYYY[年]M[月]");
});

const holidays = computed((): JapaneseHolidays.Holiday[] => {
  return getMonthHolidays();
});

watch(selected, (cr, prev) => {
  emits("selectedDate", selected.value.format("YYYY-MM-DD"));
});
</script>

<template>
  <div class="calendar">
    <div class="month">
      <button @click="prevMonth">
		<figure>
			<img src="/icons/arrow.svg" style="width: 100%" />
		</figure>
	</button>
      <h2>カレンダー{{ displayMonth }}</h2>
      <button @click="nextMonth">
			<figure>
				<img src="/icons/arrow.svg" style="width: 100%" />
			</figure>
		</button>
    </div>
    <div class="calendar_input">
      <div class="calendar_weekly">
        <div
          class="calendar_youbi"
          :style="getDateColor(getYoubi(n - 1))"
          v-for="n in 7"
          :key="n"
        >
          {{ getYoubi(n - 1) }}
        </div>
      </div>
      <div
        class="calendar_weekly"
        v-for="(week, index) in calendars"
        :key="index"
      >
        <button
          class="calendar_daily"
          v-for="(day, index) in week"
          @click="selected = day"
          :disabled="!isActiveDate(day) || isHoliday(day, getYoubi(index))"
          :style="getCelColor(getYoubi(index), day)"
          :key="index"
        >
          <div class="calendar_day">
            {{ day.get("date") }}
          </div>
          <div class="calendar_value">
            <div v-if="!isActiveDate(day)">-</div>
            <div v-else-if="isHoliday(day, getYoubi(index))" class="calendar_value_holiday">
              <p>休</p>
              <p class="holiday_name">{{getHoliday(day.get("month") + 1, day.get("date")).name}}</p>
            </div>
            <div v-else class="calendar_value_active">●</div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
