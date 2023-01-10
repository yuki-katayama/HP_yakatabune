<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
// import companiesJson from "@/assets/data/company";
// import companiesToTagsJson from "@/assets/data/company-to-tag";
// import tagsJson from "@/assets/data/company-tag";
import { Company, CompanyToTag, Tag, SearchInput } from "models/models";
import Optionbar from "@/components/Optionbar.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

/* 「乗合・貸切」ボタン色のstyle */
// const isOpenOptionbar = ref<boolean>(false);
// const styleNotActiveCharteredButton = "background-color: #252C5F; color: #fff";
// const styleActiveCharteredButton = "background-color: #fff; color: #000";

/* 検索情報 */
// const search = ref<SearchInput>({
//   date: new Date(),
//   chartered: false,
//   options: {
//     budget: {
//       min: 0,
//       max: 0,
//     },
//     tagIdList: [],
//   },
// });

/* 表示する会社 */
// const companies = ref<Company[]>();

onMounted(async () => {
  // init();
});

// const init = (): void => {
//   companies.value = getCompanies();
//   search.value = {
//     date: new Date(),
//     chartered: false,
//     options: {
//       budget: {
//         min: 0,
//         max: 0,
//       },
//       tagIdList: [],
//     },
//   };
// };

// /* データベースから取得 */
// const getCompanies = (): Company[] => {
//   // カンパニーを全取得するapi
//   return companiesJson;
// };

// const getTags = (): Tag[] => {
//   return tagsJson;
// };

// const getCompaniesToTags = (): CompanyToTag[] => {
//   return companiesToTagsJson;
// };

/**
 * @param companyId
 * @return 会社IDに属するタグの名前リスト
 */
// const getTagsListFromCompanyId = (companyId: number): Tag[] => {
//   let tagsList: Tag[] = [];
//   const toTagList = getCompaniesToTags().filter(
//     (to: CompanyToTag) => to.companyId === companyId
//   );
//   toTagList.forEach((to: CompanyToTag) => {
//     getTags().forEach((tag: Tag) => {
//       if (to.tagId === tag.id) {
//         tagsList.push(tag);
//       }
//     });
//   });
//   return tagsList;
// };

/**
 * 会社の詳細へ遷移
 */
// const onNavigateToCompany = async (company: Company) => {
//   navigateTo({
//     path: "company/" + company.id,
//   });
// };

/**
 * オプションを表示するか
 */
// const onChangeIsOptionbar = (type: boolean): void => {
//   isOpenOptionbar.value = type;
// };

/**
 * 検索ボタン押下時の会社のフィルター
 */
// const companyFilter = (): void => {
//   companies.value = getCompanies();
//   /* 乗合・貸切 */
//   if (search.value.chartered) {
//     companies.value = getCompanies().filter(
//       (company) =>
//         company.rideMethod === "chartered" || company.rideMethod === "both"
//     );
//   } else {
//     companies.value = getCompanies().filter(
//       (company) =>
//         company.rideMethod === "together" || company.rideMethod === "both"
//     );
//   }
//   /* タグのフィルター */
//   if (search.value.options.tagIdList.length !== 0) {
//     const companiesTmp: Company[] = [];
//     companies.value.forEach((company: Company) => {
//       let tagsIdList: number[] = [];
//       getTagsListFromCompanyId(company.id).forEach((tag: Tag) => {
//         tagsIdList.push(tag.id);
//       });
//       /* 全てのタグIdを含む会社を検索 */
//       if (
//         search.value.options.tagIdList.every(
//           (tagId: number) => tagsIdList.indexOf(tagId) != -1
//         )
//       ) {
//         companiesTmp.push(company);
//       }
//     });
//     companies.value = companiesTmp;
//   }
//   if (companies.value.length === 0) {
//     /* 検索結果が0件の場合 */
//     companies.value = getCompanies();
//   }
// };
</script>

<template>
    <Seo />
    <Header />
    <main id="home">
      <article id="top">
        <figure>
          <img src="images/top.jpg" width="100%" />
        </figure>
        <section>
          <h2 class="text-blue">東京の川から眺める風景、極上なひとときを屋形船で楽しもう</h2>
          <p>“船上の料亭”と言われる屋形船で、「川下りをしながら食事を楽しむ」という圧倒的な非日常感をぜひお試しください。 東京屋形船(運営：屋形船東京都協同組合)では、これまでに20万人以上の手配を行ってきました。これからもお客様の乗船場所や日程などご希望に沿った最適な屋形船を提案します。</p>
        </section>
      </article>
      <article id="about">
        <h2 class="c-top_title text-blue">屋形船とは</h2>
        <p class="p-caption">屋形船の楽しみ方：空間 / 食事 / 景色の3つ</p>
        <div class="container u-flex">
          <section>
            <figure>
              <img src="images/about1.jpg"  width="100%" />
            </figure>
            <h3 class="text-blue">非日常空間</h3>
            <p>→ 靴を脱いで広がる和の空間。普段とは異なるお出掛けで、一生の思い出づくりをしてみませんか。</p>
          </section>
          <section>
            <figure>
              <img src="images/about2.jpg"  width="100%" />
            </figure>
            <h3 class="text-blue">江戸の懐石料理</h3>
            <p>→ 屋形船の定番料理といえば、旬の揚げたての天ぷら、市場で仕入れた新鮮なお刺身。川風を感じながら東京の夜を味わい尽くす。</p>
          </section>
          <section>
            <figure>
              <img src="images/about3.jpg"  width="100%" />
            </figure>
            <h3 class="text-blue">東京の夜景</h3>
            <p>→ 川から眺める東京の街並や夜景。陸からでは見ることのできない景色を船から堪能してみませんか。大切な人との思い出になること間違いなしです。</p>
          </section>
        </div>
      </article>
      <article id="guide">
        <h2 class="c-top_title text-blue">東京湾屋形船地図</h2>
        <button class="p-to_detail text-blue">詳しく見る</button>
        <div class="map">
          <figure>
            <img src="images/guide.jpg"  width="100%" />
          </figure>
        </div>
      </article>
      <article id="for_beginner">
        <h2 class="c-top_title text-blue">初めての方へ</h2>
        <p>屋形船は日本独特の文化です。 屋形船を知らない人でもニュースや川辺で“ちょうちんのついた船”を見たことがある人は多いのではないでしょうか。船の上から見る夜の景色は格別で、地上とは違った東京の表情を見ることができます。他にはない開放感、非日常感を屋形船で体験することができます。 また乗船してみると川面と近く、川との一体感を感じることができます。 船内にはトイレ・エアコンが完備されており、快適な船旅を提供しています。</p>
      </article>
      <div class="content">
        <figure>
          <img src="images/content1.jpg"  width="100%" />
        </figure>
      </div>
      <article id="ride_type">
        <h2 class="c-top_title text-blue">貸切と乗合</h2>
        <div class="u-flex">
          <section>
            <figure>
              <img src="images/ride_type1.jpg"  width="100%" />
            </figure>
            <h3>貸切<br/>プラン</h3>
            <p>1隻の船をお客様のグループのみが利用できるプライベート空間となります。屋形船の種類によって異なりますが、10名様からの貸切可能です。仲間内でのパーティー、忘年会、お祝い事など様々なシーンでご利用いただいてます。</p>
            <div class="p-button_wrapper">
              <button>予約する</button>
            </div>
          </section>
          <section>
            <figure>
              <img src="images/ride_type2.jpg"  width="100%" />
            </figure>
            <h3>乗合<br/>プラン</h3>
            <p>少人数のお客様が集まって他の乗船客と一緒に乗船する形式です。友人、家族、カップルなど少人数から参加でき、他の乗船客と一緒に船旅を楽しんでいただきます。 座席は参加グループごとに分かれています。 各屋形船で最少催行人数が設定されています。</p>
            <div class="p-button_wrapper">
              <button>予約する</button>
            </div>
          </section>
        </div>
      </article>
    </main>
    <Footer />
      <!-- <div class="bar"> -->
        <!-- <article class="bar_container">
          <input type="date" value="ご利用日" />
          <div class="buttons">
            <button
              @click="search.chartered = false"
              :style="
                search.chartered
                  ? styleActiveCharteredButton
                  : styleNotActiveCharteredButton
              "
            >
              乗合
            </button>
            <button
              @click="search.chartered = true"
              :style="
                search.chartered
                  ? styleNotActiveCharteredButton
                  : styleActiveCharteredButton
              "
            >
              貸切
            </button>
          </div>
          <input
            type="button"
            id="optionbarArea"
            value="エリア・キーワード"
            @click="onChangeIsOptionbar(true)"
          />
          <div v-if="isOpenOptionbar" ref="optionbar">
            <Optionbar
              :search="search"
              :tags="getTags()"
              @changeIsOptionbar="onChangeIsOptionbar"
            />
          </div>
          <button>
            <figure class="search_icon" @click="companyFilter">
              <img src="/icons/search.svg" style="width: 100%" />
            </figure>
          </button>
        </article> -->
      <!-- </div> -->
</template>
