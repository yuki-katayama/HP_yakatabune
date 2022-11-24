<script setup lang="ts">
import { Company, CompanyToTag, Tag, SearchInput } from "models/models";
import { ref, onMounted } from "vue";
import companiesJson from "@/assets/data/company";
import companiesToTagsJson from "@/assets/data/company-to-tag";
import tagsJson from "@/assets/data/tag";

const route = useRoute();

const plan_tags: string[] = ["天ぷら", "飲み放題"];

onMounted(() => {
  console.log(route.params.id);
});

const getCompany = (companyId: number) => {
  return companiesJson.find((company: Company) => company.id === companyId);
};

const getTags = (): Tag[] => {
  return tagsJson;
};

const getCompaniesToTags = (): CompanyToTag[] => {
  return companiesToTagsJson;
};

const company: Company = getCompany(Number(route.params.id));

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
    });
  });
  return tagsList;
};

const onNavigateToPlan = () => {
  navigateTo({
    path: `/plan/1/1`,
  });
};
</script>

<template>
  <Seo />
  <main class="company">
    <div class="top">
      <div class="pankuzu"><NuxtLink to="/">TOP</NuxtLink> > 屋形船詳細</div>
      <h2 class="title">{{ company.name }}</h2>
      <p class="title_sub">{{ company.area }}</p>
      <p class="title_sub">¥ 12,000</p>
      <div class="tags">
        <template v-for="tag in getTagsListFromCompanyId(company.id)">
          <p class="tag">{{ tag.name }}</p>
        </template>
      </div>
      <figure>
        <img src="@/images/company.jpg" style="width: 100%" />
      </figure>
      <section class="content">
        <h3 class="content_title">
          ～浮かぶ料亭～一品一品手作りの本格的な会席料理を屋形船で
        </h3>
        <p class="content_subtitle">
          旬の食材や新鮮な魚介、吟味されたお肉料理など上質な食材を贅沢に使った一品一品手作りの本格的な和食会席です。晴海屋名物「揚げたて天ぷら」は、毎朝豊洲から仕入れる新鮮な魚介を3代目が自らさばき、熟練の技で揚げるサクッとした食感がたまらない極上の逸品です。晴海屋だからこそ味わえる、至極のお食事体験をお楽しみください。
        </p>
      </section>
    </div>
    <div class="planlist">
      <h3 class="title">プラン一覧</h3>
      <article class="card" @click="onNavigateToPlan">
        <figure style="width: 50%">
          <img src="@/images/plan.jpg" style="width: 100%" />
        </figure>
        <section class="content">
          <h3 class="content_title">
            デートや女子会にもオススメ！乗合屋形船（ふりそで御膳/全10品)
          </h3>
          <p class="content_subtitle">
            2名から乗船できる乗合屋形船♪旬の食材をふんだんに取り入れた江戸前お料理コースと飲み放題付♪デートや女子会にオススメです★
          </p>
          <div class="tags">
            <template v-for="tag in plan_tags">
              <p class="tag">{{ tag }}</p>
            </template>
          </div>
          <div class="tables">
            <table>
              <tbody>
                <tr>
                  <th>大人</th>
                  <td>¥ 12,000</td>
                </tr>
                <tr>
                  <th>中高生</th>
                  <td>¥ 10,000</td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <th>小学生</th>
                  <td>¥ 6,000</td>
                </tr>
                <tr>
                  <th>幼児</th>
                  <td>¥ 3,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </article>
    </div>
    <div class="detail">
      <h3 class="title">船会社基本情報</h3>
      <table>
        <tbody>
          <tr>
            <th>船会社名</th>
            <td>{{ company.name }}</td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td>123-4567-8901</td>
          </tr>
          <tr>
            <th>営業時間</th>
            <td>08:00 ~ 23:00<br />※毎週曜日は定休日</td>
          </tr>
          <tr>
            <th>住所</th>
            <td>〒140-0001<br />東京都品川区北品川1-16-8 船清ビル</td>
          </tr>
          <tr>
            <th>HP</th>
            <td>
              <a href="https://staging.yakatabune-kumiai.jp/"
                >https://staging.yakatabune-kumiai.jp/</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
