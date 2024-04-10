<template>
  <div class="home">
    <div class="row horizontal">
      <div class="row horizontal v_center">
        <h2>支付總金額：</h2>
        <el-input v-model="state.total" style="width: 150px" @input="addComma()"/>
      </div>
      <el-button type="info" plain @click="addPaymentCard()">新增支付項目＋</el-button>
    </div>
    <paymentCard v-for="(item, i) in state.cardList" 
      :key="i"
      :deleteCard="i !== state.cardList.length - 1" 
      :formData="item" 
      :state="state"
      :currentPayment="currentPayment" 
      :minusPayment="minusPayment"
      :minusPercent="minusPercent"
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
          <span>{{ `${paymentNum} / ` }}</span>
          <span>{{ state.overPayment }}</span>
        </div>
      </div>
      <div class="row vertical bottom_right">
        <el-button type="danger">Submit</el-button>
        <h2 data-space-top="3rem" v-if="state.paymentFinish === true">已支付所有金額！</h2>
      </div>
    </div>
  </div>
</template>


<script setup>

import Decimal from 'decimal.js';
import paymentCard from './components/paymentCard.vue'
import { ref, reactive, onMounted, computed, watch } from 'vue'


const addList = onMounted(() => state.cardList.push(paymentForm))

const state = reactive({
  total: '',
  cardList: [],
  paymentFinish: false,
  currentPayment: 0,
  balance: '',
  overPayment: 0,
  overPercent: 0,
  payState: false
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
    paymentState: '未付款'
  }
  state.cardList.unshift(newFormData)
}

//計算已支付金額
const currentPayment = () => {
  state.currentPayment = 0
  for(let i in state.cardList){
    state.currentPayment += state.cardList[i].payment.replace(/,/g, '') * 1
  }
  state.currentPayment = state.currentPayment.toLocaleString('zh', { style: 'decimal' })
}

//計算缺額
const minusPayment = () => {
  currentPayment()
  let current = state.total.replace(/,/g, '') * 1 - state.currentPayment.replace(/,/g, '') * 1
  state.overPayment = current.toLocaleString('zh', { style: 'decimal' })
  if(current < 0){
    state.overPayment = Math.abs(state.overPayment.replace(/,/g, '') * 1).toLocaleString('zh', { style: 'decimal' })
    state.payState = true
  }else state.payState = false
}

//計算缺百分比
const minusPercent = () => {
  let total = state.total.replace(/,/g, '') * 1 
  let percent = state.overPayment.replace(/,/g, '') * 1 
  state.overPercent = percent ? new Decimal(percent).div(total).times(100).toFixed(6) : 0
}





//計算支付次數
const paymentNum = computed(() => {
  let current = 0
  current = state.cardList.length
  return current
})



const deleteItem = (index) => state.cardList.splice(index, 1)



const addComma = () => {
  state.total = state.total.replace(/,/g, '') * 1
  let newNum = state.total.toLocaleString('zh', { style: 'decimal' })
  state.total = newNum
}



</script>