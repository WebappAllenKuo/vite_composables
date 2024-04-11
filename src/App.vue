<template>
  <div class="home">
    <div class="row horizontal">
      <div class="row horizontal v_center">
        <h2>支付總金額：</h2>
        <el-input v-model="state.total" style="width: 150px" @input="commaChange()" :disabled="state.paymentFinish"/>
      </div>
      <el-button type="info" plain @click="addPaymentCard()">新增支付項目＋</el-button>
    </div>
    <paymentCard v-for="(item, i) in state.cardList" 
      :key="i"
      :deleteCard="i !== state.cardList.length - 1" 
      :formData="item" 
      :state="state"
      :courtPayment="courtPayment" 
      :minusPayment="minusPayment"
      :minusPercent="minusPercent"
      :clear="clear"
      @delete:delete-item="deleteItem(i)"
    />
    <hr/>
    <div class="row horizontal space_between" data-space-top="1rem">
      <div class="row horizontal space_between">
        <div>
          <h1 data-space-bottom="1.5rem">已支付金額</h1>
          <p>{{ state.currentPayment }}</p>
        </div>
        <div>
          <h1 data-space-bottom="1.5rem">付款次數 / 剩餘款項</h1>
          <span>{{ `${paymentNum}次` }}</span>
          <span v-show="!state.payState">{{ ` ( 缺${state.overPayment}元 )` }}</span>
          <span v-show="state.payState">{{ ` ( 超收${state.overPayment}元 )` }}</span>
        </div>
      </div>
      <div class="row vertical bottom_right" data-width="60%">
        <el-button type="danger" :disabled="!state.paymentFinish" @click="state.isFinish = true">Submit</el-button>
        <h2 data-space-top="3rem" v-if="state.isFinish">已支付所有金額！</h2>
      </div>
    </div>
  </div>
</template>


<script setup>

import paymentCard from './components/paymentCard.vue'
import { usePaymentCard } from '@/composables/usePaymentCard'
import { reactive, onMounted, computed } from 'vue'


const addList = onMounted(() => state.cardList.push(paymentForm))
const { addComma, minusComma, percentMethod } = usePaymentCard()

const state = reactive({
  total: '',    //應付總金額
  cardList: [],
  paymentFinish: false,   //總金額的之狀態
  currentPayment: 0,  //當前已支付之金額
  overPayment: 0,  //所要付之金額差額
  overPercent: 0,
  payState: false, //付款狀態
  isFinish: false  //支付完成之狀態
})

const paymentForm = reactive({
  payment: '',
  percent: '',
  time: '',
  deleteCard: true,
  paymentState: '未付款',
  isDisabled: false,
  paymentMethod: ''
})


// 新增付款頁面
const addPaymentCard = () => {
  const newFormData = {
    payment: '',
    percent: 0,
    time: '',
    deleteCard: true,
    paymentState: '未付款',
    isDisabled: false,
  }
  state.cardList.unshift(newFormData)
}

//計算已支付金額
const courtPayment = () => {
  state.currentPayment = 0
  for(let i in state.cardList) state.currentPayment += minusComma(state.cardList[i].payment)
  state.currentPayment = addComma(state.currentPayment)
}

//計算是缺額還是超收
const minusPayment = () => {
  courtPayment()
  let current = minusComma(state.total) - minusComma(state.currentPayment)
  state.overPayment = addComma(current)
  if(current < 0){
    state.overPayment = addComma(Math.abs(minusComma(state.overPayment)))
    state.payState = true
  }else state.payState = false
}

//計算缺百分比
const minusPercent = () => {
  let total = minusComma(state.total)
  let percent = minusComma(state.overPayment)
  state.overPercent = percentMethod(percent, total, 100, 6)
}

//計算總支付次數
const paymentNum = computed(() => {
  let current = 0
  current = state.cardList.length
  return current
})


//刪除某特定支付款項
const deleteItem = (index) => state.cardList.splice(index, 1)

const clear = () => {
  if(state.total == state.currentPayment) state.paymentFinish = true
}

//新增comma
const commaChange = () =>{
  let num = minusComma(state.total)
  num = addComma(num)
  state.total = num
}


</script>