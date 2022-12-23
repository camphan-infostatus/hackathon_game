<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { appContent } from './core';

const maxLength = 5;
const duration = 20;
var totalTime = ref(0);

var timeOut: any;

const current = ref(0);
const countDownTimer = () => {
  if (time.value > 0) {
    timeOut = setTimeout(() => {
      time.value -= 1;
      countDownTimer();
    }, 1000);
  } else {
    next();
  }
};

const questionsList = ref([...appContent.easy.quest]);
const listResults = ref(appContent.easy.quest.map((i) => null));
const currentQuestion = computed(() => {
  return questionsList.value[current.value];
});

const clearCountdown = () => {
  if (timeOut != null) {
    clearTimeout(timeOut);
    timeOut = null;
  }
};

const rightAnswer = computed(() => listResults.value.filter((l) => !!l).length);

const next = () => {
  if (current.value === questionsList.value.length - 1) {
    clearCountdown();
    selectedResult.value = [];
    time.value = duration;
    return;
  }
  clearCountdown();

  selectedResult.value = [];
  time.value = duration;
  if (current.value > -1 && selectedResult.value.length < 5) {
    questionsList.value = questionsList.value.map((q, index) => (index === current.value ? { ...q, result: 0 } : q));
  }
  current.value = current.value + 1;
  countDownTimer();
};

onMounted(() => {
  countDownTimer();
});

const isSelected = (value: number) => {
  return selectedResult.value.includes(value);
};
const time = ref(duration);

const selectedResult = ref<number[]>([]);

const select = (value: number) => {
  if (selectedResult.value.indexOf(value) > -1) selectedResult.value = selectedResult.value.filter((i) => i !== value);
  else {
    if (selectedResult.value.length >= maxLength) return;
    else selectedResult.value.push(value);
  }
};
const checkResult = () => {
  const currentQuestion = questionsList.value[current.value];
  const selectedResults = selectedResult.value.map((s) => currentQuestion.options[s]);

  listResults.value = listResults.value.map((value, index) => {
    if (index === current.value) return currentQuestion.check(selectedResults);
    return value;
  });

  if (listResults.value[current.value]) {
    totalTime.value = totalTime.value + (duration - time.value);
    next();
  } else {
    totalTime.value = totalTime.value + duration;
  }
};
</script>
<template>
  <div class="container mx-auto h-screen flex items-center justify-center">
    <div>
      <div class="flex justify-center space-x-4 mb-10">
        <div v-for="(item, index) in questionsList">
          <div
            class="w-10 h-10 border-purple-400 text-purple-400 border flex items-center justify-center rounded-full"
            :class="{
              '!bg-purple-400 text-white !border-purple-400': current === index,
              '!bg-red-400 text-white !border-red-500': listResults[index] != null && listResults[index] === false,
              '!bg-green-400 text-white !border-green-400': listResults[index] === true,
            }"
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>
      <div class="text-center text-2xl mb-6">
        {{ currentQuestion.quest_title }}
      </div>
      <div class="grid grid-cols-10 grid-rows-5 mb-6">
        <div
          @click="select(index)"
          :class="{ 'bg-purple-400 text-white': isSelected(index) }"
          v-for="(item, index) in currentQuestion.options"
          class="border border-gray-800 cursor-pointer min-w-[80px] w-full h-20 flex items-center justify-center"
        >
          {{ item }}
        </div>
      </div>
      <div class="flex justify-between mb-10">
        <div class="text-4xl">{{ time }}s</div>
        <button @click="checkResult()" class="bg-purple-400 text-white px-4 py-2 rounded">Check</button>
      </div>
      <div>Total: {{ totalTime }} | Right Answers: {{ rightAnswer }}</div>
    </div>
  </div>
</template>
