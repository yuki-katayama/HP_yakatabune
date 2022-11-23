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
    options: {
      budget: {
        min: 0,
        max: 0,
      },
      tagIdList: [],
    }
  });

/* 表示する会社 */
const companies = ref<Company[]>();

onMounted(() => {
  init()
});

const init = (): void => {
  companies.value = getCompanies();
  search.value = {
    date: new Date(),
    chartered: false,
    options: {
      budget: {
        min: 0,
        max: 0,
      },
      tagIdList: [],
    }
  }
}

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
const getTagsListFromCompanyId = (companyId: number): Tag[] => {
  let tagsList: Tag[] = [];
  const toTagList = getCompaniesToTags().filter(
    (to: CompanyToTag) => to.companyId === companyId
  );
  toTagList.forEach((to: CompanyToTag) => {
    getTags().forEach((tag: Tag) => {
      if (to.tagId === tag.id) {
        tagsList.push(tag);
      }
    })
  })
  return tagsList;
};

/**
 * 会社の詳細へ遷移
 */
const onCardClick = (company: Company): void => {
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
const onChangeIsOptionbar = (type: boolean): void => {
  isOpenOptionbar.value = type;
};

/**
 * 検索ボタン押下時の会社のフィルター
 */
const companyFilter = (): void => {
  companies.value = getCompanies()
  /* 乗合・貸切 */
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
  /* タグのフィルター */
  if (search.value.options.tagIdList.length !== 0) {
    const companiesTmp: Company[] = [];
    companies.value.forEach((company: Company) => {
      let tagsIdList: number[] = [];
      getTagsListFromCompanyId(company.id).forEach((tag: Tag) => {
        tagsIdList.push(tag.id)
      });
      /* 全てのタグIdを含む会社を検索 */
      if (search.value.options.tagIdList.every((tagId: number) => tagsIdList.indexOf(tagId) != -1)) {
        companiesTmp.push(company);
      }
    })
    companies.value = companiesTmp;
  }
  if (companies.value.length === 0) {
    /* 検索結果が0件の場合 */
    companies.value = getCompanies();
  }
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
    {{search.options.budget.min}}
    <div class="container">
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
              v-for="tag in getTagsListFromCompanyId(company.id)"
              class="card_tags"
            >
              <p class="tag">{{ tag.name }}</p>
            </template>
          </div>
        </section>
      </article>
    </div>
  </main>
</template>
