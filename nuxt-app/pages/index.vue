<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import companiesJson from "@/assets/data/company";
import companiesToTagsJson from "@/assets/data/company_to_tag";
import tagsJson from "@/assets/data/tag";
import { Company, CompanyToTag, Tag, SearchInput } from "models/models";
import Optionbar from "~~/components/Optionbar.vue";

/* 「乗合・貸切」ボタン色のstyle */
const isOpenOptionbar = ref<boolean>(false);
const styleNotActiveCharteredButton = "background-color: #252C5F; color: #fff";
const styleActiveCharteredButton = "background-color: #fff; color: #000";

/* 検索情報 */
const search = ref<SearchInput>({
  date: new Date(),
  chartered: false,
  area: [],
  budget: {
    min: 0,
    max: 0,
  },
  payment: [],
  other: [],
});

/* 表示する会社 */
const companies = ref<Company[]>();

onMounted(() => {
  companies.value = getCompanies();
});

/* データベースから取得 */
const getCompanies = (): Company[] => {
  // カンパニーを全取得するapi
  return companiesJson;
};

const getTags = (): Tag[] => {
  return tagsJson;
};

const getCompaniesToTags = (): CompanyToTag[] => {
  return companiesToTagsJson;
};
/**
 * @param companyId
 * @return 会社IDに属するタグの名前リスト
 */
const getTagsListFromCompanyId = (companyId: number): string[] => {
  let tagNameList: string[] = [];
  const toTagList = getCompaniesToTags().filter(
    (to: CompanyToTag) => to.companyId === companyId
  );
  for (const toTag of toTagList) {
    for (const tag of getTags()) {
      if (toTag.tagId === tag.id) {
        tagNameList.push(tag.name);
      }
    }
  }
  return tagNameList;
};

/**
 * 会社の詳細へ遷移
 */
const onCardClick = (company: Company): void => {
  console.log(company);
  navigateTo({
    path: "company/" + company.id,
    // query: {
    // 	company: JSON.stringify(company)
    // }
  });
};

/**
 * オプションを表示するか
 */
const onChangeIsOptionbar = (type: boolean) => {
  isOpenOptionbar.value = type;
};

/**
 * 検索ボタン押下時の会社のフィルター
 */
const companyFilter = () => {
  if (search.value.chartered) {
    companies.value = getCompanies().filter(
      (company) =>
        company.rideMethod === "chartered" || company.rideMethod === "both"
    );
  } else {
    companies.value = getCompanies().filter(
      (company) =>
        company.rideMethod === "together" || company.rideMethod === "both"
    );
  }
  console.log("a");
};
</script>

<style lang="scss" scoped>
@import "assets/setting/_config.scss";
.container {
  width: 100vw;
  margin: 2rem;
  display: flex;
  flex-flow: row wrap;
  .card {
    width: 15vw;
    margin: 2rem;
    &_tags {
      display: flex;
      .tag {
        background-color: $util;
        color: $white;
        margin-right: 1rem;
      }
    }
  }
}
</style>

<template>
  <Seo />
  <main>
    <div class="bar">
      <article class="bar_container">
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
            <img src="icons/search.svg" style="width: 100%" />
          </figure>
        </button>
      </article>
    </div>
    <div class="container">
      {{ search.budget.max }}
      <article
        v-for="company in companies"
        class="card"
        @click="onCardClick(company)"
      >
        <figure style="width: 100%">
          <img :src="company.imgUrl" style="width: 100%" />
        </figure>
        <section>
          <h2>{{ company.name }}</h2>
          <p>{{ company.area }}</p>
          <p>¥ {{ company.price }}</p>
          <div class="card_tags">
            <template
              v-for="tagName in getTagsListFromCompanyId(company.id)"
              class="card_tags"
            >
              <p class="tag">{{ tagName }}</p>
            </template>
          </div>
        </section>
      </article>
    </div>
  </main>
</template>
