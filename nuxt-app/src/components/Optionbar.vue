<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from "vue";
import { SearchInput, Tag } from "models/models";

interface Emits {
  (e: "changeIsOptionbar", type: boolean): void;
}

interface Props {
  search: SearchInput;
  tags: Tag[];
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();

onMounted(() => {
  console.log("mounted");
  addEventListener("click", onCloseOptionbar);
});

// EventListenerの削除
onBeforeUnmount(() => {
  removeEventListener("click", onCloseOptionbar);
});

/*  */
const isOptionArea = ref<boolean>(false);
const styleActiveOptionButton = "border-bottom: solid 2px #eb5656;";

const optionbar = ref<HTMLDivElement>(); // 対象の要素
const onCloseOptionbar = (e: MouseEvent) => {
  // [対象の要素]が[クリックされた要素]を含まない場合
  if (
    e.target instanceof Node &&
    !optionbar.value?.contains(e.target) &&
    e.target.id !== "optionbarArea"
  ) {
    emits("changeIsOptionbar", false);
  }
};

const onCheckBox = (event: any, tagId: number) => {
  if (event.target.checked) {
    props.search.options.tagIdList.push(tagId);
  } else {
    const index = props.search.options.tagIdList.indexOf(tagId);
    props.search.options.tagIdList.splice(index, 1);
  }
};

const isChecked = (tagId: number) => {
  return props.search.options.tagIdList.indexOf(tagId) === -1 ? false : true;
};

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
      <button
        class="optionbar_header_name"
        @click="onChangeIsOptionArea(true)"
        :style="isOptionArea ? styleActiveOptionButton : ''"
      >
        エリア
      </button>
      <button
        class="optionbar_header_name"
        @click="onChangeIsOptionArea(false)"
        :style="isOptionArea ? '' : styleActiveOptionButton"
      >
        こだわり
      </button>
    </div>
    <div v-if="isOptionArea">
      <div v-for="tag in tags" key="tag">
        <div v-if="tag.type === 'area'">
          <div class="select_button">
            <input
              type="checkbox"
              @click="onCheckBox($event, tag.id)"
              :checked="isChecked(tag.id)"
            />
            <label>{{ tag.name }}</label>
          </div>
        </div>
      </div>
    </div>
    <div v-else="isOptionArea">
      <label>一人当たりの予算</label>
      <div>
        <input
          type="number"
          placeholder="下限なし"
          v-model="props.search.options.budget.min"
        />
        ~
        <input
          type="number"
          placeholder="上限なし"
          v-model="props.search.options.budget.max"
        />
      </div>
      <label>支払い方法</label>
      <div v-for="tag in tags" key="tag">
        <div v-if="tag.type === 'payment'">
          <div class="select_button">
            <input
              type="checkbox"
              @click="onCheckBox($event, tag.id)"
              :checked="isChecked(tag.id)"
            />
            <label>{{ tag.name }}</label>
          </div>
        </div>
      </div>
      <label>その他</label>
      <div v-for="tag in tags" key="tag">
        <div v-if="tag.type === 'other'">
          <div class="select_button">
            <input type="checkbox" @input="onCheckBox($event, tag.id)" />
            <label>{{ tag.name }}</label>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
