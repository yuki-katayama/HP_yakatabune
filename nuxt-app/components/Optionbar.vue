<script setup lang="ts">
import {ref, onBeforeUnmount, onMounted} from "vue";
import { Event, SearchInput, Tag } from "models/models";


interface Emits {
	(event: "changeIsOptionbar", type: boolean): void;
}

interface Props {
	search: SearchInput;
	tags: Tag[]
}

onMounted(() => {
  console.log("mounted");
  addEventListener('click', onCloseOptionbar)
});

// EventListenerの削除
onBeforeUnmount(() => {
  removeEventListener('click', onCloseOptionbar)
})


const isOptionArea = ref<boolean>(false);
const styleActiveOptionButton = "border-bottom: solid 2px #eb5656;";

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const optionbar = ref<HTMLDivElement | null>(null) // 対象の要素
const onCloseOptionbar = (e: MouseEvent) => {
    // [対象の要素]が[クリックされた要素]を含まない場合
    if (e.target instanceof Node && !optionbar.value?.contains(e.target) && e.target.id !== "optionbarArea") {
		emits('changeIsOptionbar', false);
    }
}

const onCheckBox = (event: Event, number: number) => {
  if (event.target.checked) {
    // console.log(search.value.other.push(event.target));
  }
  console.log(number);
}

const onChangeIsOptionArea = (type: boolean): void => {
  if (type == true) {
    isOptionArea.value = true;
  } else {
    isOptionArea.value = false;
  }
};

</script>

<template>
	<section class="optionbar" ref="optionbar">
			<div class="optionbar_header">
				<button class="optionbar_header_name" @click="onChangeIsOptionArea(true)" :style="isOptionArea ? styleActiveOptionButton : '' ">エリア</button>
				<button class="optionbar_header_name" @click="onChangeIsOptionArea(false)" :style="isOptionArea ? '' : styleActiveOptionButton ">こだわり</button>
			</div>
			<div v-if="isOptionArea">
				<div v-for="tag in tags" key="tag">
          <div v-if="tag.type === 'area'">
            <div class="select_button">
              <input type="checkbox" @click="onCheckBox($event, tag.id)"/>
              <label>{{tag.name}}</label>
            </div>
          </div>
        </div>
			</div>
			<div v-else="isOptionArea">
				<label>一人当たりの予算</label>
				<div>
					<input type="number" placeholder="下限なし" v-model="search.budget.min" /> ~ <input type="number" placeholder="上限なし" v-model="search.budget.max" />
				</div>
				<label>支払い方法</label>
				<div v-for="tag in tags" key="tag">
          <div v-if="tag.type === 'payment'">
            <div class="select_button">
              <input type="checkbox" @click="onCheckBox($event, tag.id)"/>
              <label>{{tag.name}}</label>
            </div>
          </div>
        </div>
        <label>その他</label>
        <div v-for="tag in tags" key="tag">
          <div v-if="tag.type === 'other'">
            <div class="select_button">
              <input type="checkbox" @input="onCheckBox($event, tag.id)"/>
              <label>{{tag.name}}</label>
            </div>
          </div>
        </div>
			</div>
		</section>
</template>