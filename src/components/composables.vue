<template>
  <div class="composables">
    <div class="row horizontal" style="width: 600px">
      <div class="row horizontal v_center">
        <h2>支付總金額：</h2>
        <el-input v-model="state.total" style="width: 150px" @input="commaChange(state.total)" :disabled="state.isFinish"/>
      </div>
      <el-button v-if="!state.paymentFinish" type="info" plain @click="addPaymentCard()">新增支付項目＋</el-button>
    </div>
    <paymentCard v-for="(item, i) in state.cardList" 
      :key="i"
      :deleteCard="i !== state.cardList.length - 1" 
      :formData="item" 
      :state="state"
      :finish="finish"
      @delete:delete-item="deleteItem(i)"
      @add:add-total="addTotal(i)"
    />
    <hr style="width: 600px" align="left"/>
    <div class="row horizontal" data-space-top="1rem" style="width: 600px">
      <div data-width="50%">
        <h1 data-space-bottom="1.5rem">已支付金額</h1>
        <p>{{ state.confirmPayment }}</p>
      </div>
      <div data-width="60%">
        <h1 data-space-bottom="1.5rem">付款次數 / 剩餘款項</h1>
        <span>{{ `${state.confirmCount}/${paymentNum}` }}</span>
        <span v-show="state.confirmPayState == '缺少'">{{ ` ( 缺${state.confirmOverPayment}元 )` }}</span>
      </div>
      <div class="row vertical h_end" data-width="35%">
        <el-button type="danger" :disabled="!state.paymentFinish" @click="state.isFinish = true">Submit</el-button>
        <h2 data-space-top="3rem" v-if="state.isFinish">已支付所有金額！</h2>
      </div>
    </div>
  </div>
</template>


<script setup>
import paymentCard from './paymentCard.vue'
import { usePaymentCard } from '../composables/usePaymentCard'
import { reactive, onMounted, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'


const addList = onMounted(() => state.cardList.push(paymentForm))
const { addComma, minusComma, percentMethod, handleInteger, confirmState } = usePaymentCard()

const state = reactive({
  total: '',    //應付總金額
  cardList: [],
  paymentFinish: false,   //總金額的之狀態
  isFinish: false,  //全部支付完成之狀態,
  currentPayment: 0,  //試算當前所有輸入框裡所有金額
  overPayment: 0,  //所要付之金額差額
  overPercent: 0,
  payState: '', //試算當前所有輸入框裡所有金額之付款狀態
  confirmPayState: '', //已確認支付金額還有多少差額（或超額）之狀態
  confirmCount : 0,   // 已確認支付之次數
  confirmOverPayment: 0, // 已確認支付金額之剩餘差額
  confirmPayment: 0 // 已確認支付金額
})

const paymentForm = reactive({
  payment: '',
  percent: '',
  time: '',
  deleteCard: true,
  paymentState: '未付款',
  isDisabled: false,
  paymentMethod: '1'
})

// 新增付款頁面
const addPaymentCard = () => {
  const newFormData = {
    payment: '',
    percent: 0,
    time: '',
    deleteCard: true,
    paymentMethod: '1',
    paymentState: '未付款',
    isDisabled: false,
  }
  state.cardList.unshift(newFormData)
}

//刪除某特定支付款項
const deleteItem = (index) => {
  state.cardList.splice(index, 1)
  ElMessage.success('已刪除成功！')
}

//計算總支付次數
const paymentNum = computed(() => {
  let current = 0
  current = state.cardList.length
  return current
})

//試算所有已支付金額
const courtPayment = () => {
  state.currentPayment = 0
  for(let i in state.cardList) state.currentPayment += minusComma(state.cardList[i].payment)
  state.currentPayment = addComma(state.currentPayment)
}

//計算缺百分比
const balancePercent = () => {
  let total = minusComma(state.total)
  let percent = minusComma(state.overPayment)
  state.overPercent = percentMethod(percent, total, 100, 6)
}

//共用邏輯計算金額差額
const calculatePayment = (total, num) => {
  let current = minusComma(total) - minusComma(num)
  let res = {
    overPayment: 0,
    payState: ''
  }
  if(current < 0){
    res.overPayment = addComma(Math.abs(current))
    res.payState = '超收'
  }else if(current > 0){
    res.overPayment = addComma(current)
    res.payState = '缺少'
  }
  return res
}

//是算所有子組件的金額是缺額還是超收
const balancePayment = () => {
  courtPayment()
  const { overPayment, payState } = calculatePayment(state.total, state.currentPayment)
  state.overPayment = overPayment
  state.payState = payState
}

//獲取確認付款之差額
const overPayment = () => {
  const { overPayment, payState } = calculatePayment(state.total, state.confirmPayment)
  state.confirmOverPayment = overPayment
  state.confirmPayState = payState
}

//獲取確認付款之指定資料
const addTotal = (index, cb) => {
  let num = minusComma(state.cardList[index].payment)
  let total = minusComma(state.total)
  confirmState.increment(num)

  if(confirmState.total <= total){
    state.confirmPayment = addComma(confirmState.total)
    overPayment()
    state.confirmCount ++
    state.cardList[index].paymentState = '已付款'
    state.cardList[index].isDisabled = true
    finish()
    ElMessage.success('已付款成功')
  }else{
    ElMessage.error('已支付金額超額，請重新輸入')
    confirmState.total -= num
  }
}


const finish = () => {
  if(state.total == state.confirmPayment && state.total !== 0){
    state.paymentFinish = true
  }else{
    state.paymentFinish = false
  }
}

//新增comma
const commaChange = (num) => {
  let val = addComma(minusComma(handleInteger(num)))
  state.total = val
}


watch(() => state.total, () => {
  balancePayment()
  balancePercent()
  overPayment()
  finish()
})

watch(() => state.cardList, () => {
  balancePayment()
  balancePercent()
}, { deep: true })



</script>