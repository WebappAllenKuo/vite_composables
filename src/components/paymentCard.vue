<template>
  <div class="card">
    <div class="row horizontal v_center" data-space-bottom="1.5rem">
      <div class="row horizontal v_center">
        <p data-space-right="1rem">支付方式</p>
        <el-radio-group v-model="formData.paymentMethod" class="ml-4" :disabled="formData.isDisabled">
          <el-radio value="1" size="large">現金</el-radio>
          <el-radio value="2" size="large">信用卡</el-radio>
        </el-radio-group>
      </div>
      <div class="row horizontal space_evenly center">
        <h2>{{ formData.paymentState }}</h2>
        <el-button type="danger" plain @click="handleConfirm()">確認付款</el-button>
      </div>
      <el-button v-if="deleteCard" type="danger" text circle :icon="CloseBold" @click="handleDelete()"/>
    </div>
    <el-form label-width="auto" label-position="left" :disabled="formData.isDisabled">
      <el-form-item label="金額（整數）">
        <el-input v-model="formData.payment" style="width: 240px" @input="handleChange(formData.payment)"/>
      </el-form-item>
      <p v-show="!state.payState">{{ `缺${state.overPayment}元 (${state.overPercent}％)` }}</p>
      <p v-show="state.payState">{{ `超收${state.overPayment}元` }}</p>
      <el-form-item label="所佔百分比">
        <el-input v-model="formData.percent" style="width: 240px" @input="updatePayment(formData.percent)"/>
        <span data-space-left="0.5rem">%</span>
      </el-form-item>
      <el-form-item label="最晚付款日">
        <el-date-picker
          v-model="formData.time"
          type="date"
          :disabled-date="disabledDate"
          style="width: 240px"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref,reactive, onMounted, watch } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import { useMessageBox } from '@/composables/useMessageBox'
import Decimal from 'decimal.js'


const { messageBox } = useMessageBox()

const props = defineProps({ 
  deleteCard: {
    type: Boolean,
    default: true
  },
  formData: Object,
  state: Object,
  currentPayment: Function,
  minusPayment: Function,
  minusPercent: Function
})

const emit = defineEmits(['delete:deleteItem'])

//付款時間選擇區間（不可選今天之前的）
const disabledDate = (time) => { return time.getTime() < Date.now() - 86400000 }

//確認付款
const handleConfirm = () => {
  messageBox('確認付款？', '已付款成功', '已取消付款', ()=>{
    props.formData.paymentState = '已付款'
    props.formData.isDisabled = true
    props.currentPayment()
  })
}

//把資料傳給父組件來刪除其陣列內資料
const deleteItem = () => emit('delete:deleteItem')


// 帶入金額時計算百分比
const updatePercent = (val) => {
  val = val.replace(/,/g, '') * 1
  const totalPayment = props.state.total.replace(/,/g, '') * 1 || 0
  const newPercent = val ? new Decimal(val).div(totalPayment).times(100).toFixed(6) : 0
  props.formData.percent = newPercent
}

//帶入百分比計算金額
const updatePayment = (val) => {
  val = val.replace(/,/g, '') * 1
  const totalPayment = props.state.total.replace(/,/g, '') * 1 || 0
  const newPayment = val ? new Decimal(val).div(100).times(totalPayment).toFixed(0) : 0
  props.formData.payment = newPayment
}

// 刪除確認
const handleDelete = () => {
  messageBox('確認刪除？', '已刪除成功', '已取消刪除', ()=>{
    deleteItem()
  })
}

//
const handleChange = (val) => {
  updatePercent(val)
  addComma(val)
}

//composabled
const addComma = (num) => {
  num = num.replace(/,/g, '') * 1
  let newNum = num.toLocaleString('zh', { style: 'decimal' })
  props.formData.payment = newNum
}





watch(
  () => props.state.total,
  () => {
    updatePercent(props.formData.payment)
    props.minusPayment()
    props.minusPercent()
  }
)

watch(
  () => props.formData.payment,
  () => {
    addComma(props.formData.payment)
    props.minusPayment()
    props.minusPercent()
  }
)


</script>