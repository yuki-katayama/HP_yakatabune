<script setup lang="ts">
import { ref } from "vue";
import companiesJson from "@/assets/data/company";
import companiesToTagsJson from "@/assets/data/company_to_tag";
import tagsJson from "@/assets/data/tag";
import { Company, CompanyToTag, Tag } from "models/models";

/* ボタン色の切り替え */
const isChartered = ref<boolean>(false);

/* ボタン色のstyle */
const styleNotActiveButton = 'background-color: #252C5F; color: #fff';
const styleActiveButton = 'background-color: #fff; color: #000';

/* jsonデータ */
const companies: Company[] = companiesJson;
const companiesToTags: CompanyToTag[] = companiesToTagsJson;
const tags: Tag[] = tagsJson;

const onMounted = () => {
	// tags
	console.log("mounted");
}

const onChangeIsChartered = (type: boolean): void => {
	if (type == true) {
		isChartered.value = true
	} else {
		isChartered.value = false
	}
}

/**
 * @param companyId
 * @return 会社IDに属するタグの名前リスト
 */
const getTagsList = (companyId: number): string[] => {
	let tagNameList: string[] = []
	const toTagList = companiesToTags.filter((to: CompanyToTag) => (
		to.companyId === companyId
	))
	for (const toTag of toTagList) {
		for (const tag of tags) {
			if (toTag.tagId === tag.id) {
				tagNameList.push(tag.name);
			}
		}
	}
	return tagNameList
}

const onCardClick= (company: Company): void => {
	console.log(company);
	navigateTo({
		path: "company/" + company.id,
		// query: {
		// 	company: JSON.stringify(company)
		// }
	});
}
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
				<input type="date" value="ご利用日"/>
				<div class="buttons">
					<button @click="onChangeIsChartered(true)" :style="(isChartered) ? styleNotActiveButton : styleActiveButton " >乗合</button>
					<button @click="onChangeIsChartered(false)" :style="(isChartered) ? styleActiveButton : styleNotActiveButton ">貸切</button>
				</div>
				<select name="cars" id="cars">
					<option value="volvo">エリア・キーワード</option>
					<option value="saab">Saab</option>
					<option value="mercedes">Mercedes</option>
					<option value="audi">Audi</option>
				</select>
				<button>
					<figure class="search_icon">
						<img src="icons/search.svg" style="width: 100%"/>
					</figure>
				</button>
			</article>
		</div>
		<div class="container">
			<article v-for="company in companies" class="card" @click="onCardClick(company)">
				<figure style="width: 100%">
					<img :src=company.imgUrl style="width: 100%"/>
				</figure>
				<section>
					<h2>{{company.name}}</h2>
					<p>{{company.area}}</p>
					<p>¥ {{company.price}}</p>
					<div class="card_tags">
						<template v-for="tagName in getTagsList(company.id)" class="card_tags">
							<p class="tag">{{tagName}}</p>
						</template>
					</div>
				</section>
			</article>
		</div>
	</main>
</template>
