<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from "vue";
import companiesToPlasnsJson from "@/assets/data/company-to-plan";
import PlansJson from "@/assets/data/plan";
import companiesJson from "@/assets/data/company";
import { Company, CompanyToPlan, Plan, Reserve } from "models/models";

const route = useRoute();
const companyId = Number(route.params.companyId);
const planId = Number(route.params.id);
const taxRate = 0.1; // 10%
const week = ["日", "月", "火", "水", "木", "金", "土"];
const plan = ref<Plan>();
const reserve = ref<Reserve>({
  date: new Date(),
  num: {
    adult: 0,
    middle: 0,
    elementary: 0,
    baby: 0,
  },
});

const sumPrice = computed(() => {
  return (
    reserve.value!.num.adult * plan.value!.price.adult +
    reserve.value!.num.middle * plan.value!.price.middle +
    reserve.value!.num.elementary * plan.value!.price.elementary +
    reserve.value!.num.baby * plan.value!.price.baby
  );
});
const sumNum = computed(() => {
  return (
    reserve.value!.num.adult +
    reserve.value!.num.middle +
    reserve.value!.num.elementary +
    reserve.value!.num.baby
  );
});

const dispalyDate = computed(() => {
  return (
    (reserve.value!.date.getMonth() + 1) + '月' +
    reserve.value!.date.getDate() + '日' +
    " (" + week[reserve.value!.date.getDay()] + ")"
  );
});

const onSelectedDate = (yyyymmdd: string) => {
  reserve.value.date = new Date(yyyymmdd);
}

onBeforeMount(() => {
  console.log("plan => beforeMounted");
});

onMounted(() => {
  console.log("plan => mounted");
  window.addEventListener("click", onClick)
  window.addEventListener("scroll", getScroll)
  isCorrectPlan();
});

onBeforeUnmount(() => {
  window.removeEventListener("click", onClick)
  window.removeEventListener("scroll", getScroll)
});

const onClick = () => {
  console.log("all listner")
  // const calendar = document.getElementsByClassName("calendar_panel")[1];
  // calendar!.addEventListener('click',function(){ // ②
  //     console.log(`calendarがクリックされました！`); // ③
  // });
  // if (57 < window.scrollY) {
  //   // elem.style.top = '57px'
  // } else {
  //   // elem.style.top = 'unset'
  // }
}


const getScroll = () => {
  /* 予約フォームの高さを固定 */
  let elem = document.getElementById("reserve");
  if (57 < window.scrollY) {
    // elem.style.top = '57px'
  } else {
    // elem.style.top = 'unset'
  }
  console.log(window.scrollY);
}

const getCompaniesToPlans = (): CompanyToPlan[] => {
  return companiesToPlasnsJson;
};

const getCompany = (companyId: number) => {
  return companiesJson.find((company: Company) => company.id === companyId);
};

const getPlan = (planId: number) => {
  return PlansJson.find((plan: Plan) => plan.id === planId);
};

plan.value = getPlan(planId);

const isCorrectPlan = () => {
  const isCompanyHavePlan: boolean = !!getCompaniesToPlans().find(
    (to: CompanyToPlan) => to.companyId === companyId && to.planId === planId
  );
  if (isCompanyHavePlan && !!plan.value) {
    return;
  } else {
    if (!!plan.value) {
      console.log("planId " + planId + " が存在しません");
    } else if (isCompanyHavePlan === false) {
      console.log(
        "会社(" + companyId + ")はプランId " + planId + " を所持していません"
      );
    }
    navigateTo({
      path: "/company/" + companyId,
    });
  }
};
</script>

<template>
  <Seo />
  <main id="plan">
    <div class="pankuzu">
      <NuxtLink to="/">TOP</NuxtLink>
      >
      <NuxtLink :to="{ path: '/company/' + companyId }">{{
        getCompany(companyId)!.name
      }}</NuxtLink>
      > 屋形船詳細
    </div>
    <h3 class="title">{{ plan!.name }}</h3>
    <div class="content">
      <figure>
        <img :src="plan!.imagePath" style="width: 100%" />
      </figure>
      <table>
        <tbody>
          <tr>
            <th>所要時間</th>
            <td>{{ plan!.requiredTime }}</td>
          </tr>
          <tr>
            <th>周遊コース</th>
            <td>{{ plan!.tourCourse }}</td>
          </tr>
          <tr>
            <th>料金</th>
            <td>
              <div class="price">
                <div class="price_row">
                  <label>大人</label>
                  <p>¥ {{ plan!.price.adult }}</p>
                </div>
                <div class="price_row">
                  <label>中高生</label>
                  <p>¥ {{ plan!.price.middle }}</p>
                </div>
              </div>
              <div class="price">
                <div class="price_row">
                  <label>小学生</label>
                  <p>¥ {{ plan!.price.elementary }}</p>
                </div>
                <div class="price_row">
                  <label>幼児</label>
                  <p>¥ {{ plan!.price.baby }}</p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>出航時間</th>
            <td>
              {{ plan!.departureTime }}
            </td>
          </tr>
          <tr>
            <th>外観</th>
            <td>
              {{ plan!.appearance }}
            </td>
          </tr>
          <tr>
            <th>席タイプ</th>
            <td>
              {{ plan!.seat }}
            </td>
          </tr>
          <tr>
            <th>デッキ</th>
            <td v-if="plan!.deck">あり</td>
            <td v-else>なし</td>
          </tr>
          <tr>
            <th>Wi-Fi</th>
            <td v-if="plan!.wifi">あり</td>
            <td v-else>なし</td>
          </tr>
          <tr>
            <th>アレルギー対応</th>
            <td v-if="plan!.allergySupport">あり</td>
            <td v-else>なし</td>
          </tr>
          <tr>
            <th>トイレタイプ</th>
            <td>{{ plan!.toilet }}</td>
          </tr>
          <tr>
            <th>料理コース内容</th>
            <td>
              <p>{{ plan!.cuisine.explain }}</p>
              <p>
                <figure>
                  <img :src="plan!.cuisine.imagePath" style="width: 100%" />
                </figure>
              </p>
            </td>
          </tr>
          <tr>
            <th>集合場所</th>
            <td>{{ plan!.place }}</td>
          </tr>
          <tr>
            <th>注意事項</th>
            <td>{{ plan!.notes }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="reserve">
      <h4 class="title">予約選択</h4>
      <div id="calendar">
        <div class="output">
          <label>ご利用日</label>
          <div class="display">
            <p>{{dispalyDate}}</p>
            <figure>
              <img src="/icons/down.svg" style="width: 100%" />
            </figure>
          </div>
        </div>
        <div class="calendar_panel">
          <Calendar  @selectedDate="onSelectedDate" />
        </div>
      </div>
      <div class="people">
        <div class="output">
          <label>人数</label>
          <div class="display">
            <p>✖︎</p>
            <p>{{ sumNum }} 人</p>
            <figure>
              <img src="/icons/down.svg" style="width: 100%" />
            </figure>
          </div>
        </div>
        <div class="people_panel">
          <div class="row">
            <label>大人</label>
            <button
              class="panel_button"
              :disabled="reserve!.num.adult < 1"
              @click="reserve!.num.adult--"
            >
              -
            </button>
            <p>{{ reserve!.num.adult }}人</p>
            <button class="panel_button" @click="reserve!.num.adult++">
              +
            </button>
          </div>
          <div class="row">
            <label>中高生</label>
            <button
              class="panel_button"
              :disabled="reserve!.num.middle < 1"
              @click="reserve!.num.middle--"
            >
              -
            </button>
            <p>{{ reserve!.num.middle }}人</p>
            <button class="panel_button" @click="reserve!.num.middle++">
              +
            </button>
          </div>
          <div class="row">
            <label>小学生</label>
            <button
              class="panel_button"
              :disabled="reserve!.num.elementary < 1"
              @click="reserve!.num.elementary--"
            >
              -
            </button>
            <p>{{ reserve!.num.elementary }}人</p>
            <button class="panel_button" @click="reserve!.num.elementary++">
              +
            </button>
          </div>
          <div class="row">
            <label>乳幼児</label>
            <button
              class="panel_button"
              :disabled="reserve!.num.baby < 1"
              @click="reserve!.num.baby--"
            >
              -
            </button>
            <p>{{ reserve!.num.baby }}人</p>
            <button class="panel_button" @click="reserve!.num.baby++">+</button>
          </div>
        </div>
        <div class="sum">
          <label>消費税</label>
          <p>¥ {{ sumPrice * taxRate }}</p>
        </div>
      </div>
      <div class="sum">
        <label>合計(税込)</label>
        <p>¥ {{ sumPrice * taxRate + sumPrice }}</p>
      </div>
      <div class="reserve_button">
        <button>予約する</button>
      </div>
    </div>
  </main>
</template>
