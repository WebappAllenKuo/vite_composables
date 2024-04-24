<template>
  <div class="card" >
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
        <el-button :disabled="formData.isDisabled" type="danger" plain @click="handleConfirm()">確認付款</el-button>
      </div>
      <el-button v-if="deleteCard" type="danger" text circle :icon="CloseBold" @click="handleDelete()" :disabled="formData.isDisabled"/>
    </div>
    <el-form label-width="auto" label-position="left" :disabled="formData.isDisabled">
      <el-form-item label="金額（整數）">
        <el-input v-model="formData.payment" style="width: 240px" @input="handleChange(formData.payment)" />
      </el-form-item>
      <p v-show="state.payState == '缺少'">{{ `缺${state.overPayment}元 (${state.overPercent}％)` }}</p>
      <p v-show="state.payState == '超收'">{{ `超收${state.overPayment}元` }}</p>
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
import { watch } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import { usePaymentCard } from '@/composables/usePaymentCard'


const { messageBox, addComma, minusComma, percentMethod, handleInteger } = usePaymentCard()

const props = defineProps({ 
  deleteCard: {
    type: Boolean,
    default: true
  },
  formData: Object,
  state: Object,
  finish: Function
})

const emit = defineEmits(['delete:deleteItem', 'add:addTotal'])

//付款時間選擇區間（不可選今天之前的）
const disabledDate = (time) => { return time.getTime() < Date.now() - 86400000 }

const deleteItem = () => emit('delete:deleteItem')
const addTotal = () => emit('add:addTotal')

//確認付款
const handleConfirm = () => {
  messageBox('確認付款？', '已取消付款', () => {
    addTotal()
  })
}

// 帶入金額時計算百分比
const updatePercent = (val) => {
  val = minusComma(handleInteger(val))
  const totalPayment = minusComma(props.state.total)
  const newPercent = percentMethod(val, totalPayment, 100, 6)
  props.formData.percent = newPercent
}

//帶入百分比計算金額
const updatePayment = (val) => {
  props.formData.percent = val.replace(/[^\d.]/g, '').replace(/^0+(?=\d)/g, '')
  const totalPayment = minusComma(props.state.total)
  const newPayment = percentMethod(props.formData.percent, 100, totalPayment, 0)
  props.formData.payment = newPayment
}

// 刪除確認
const handleDelete = () => {
  messageBox('確認刪除？', '已取消刪除', () => {
    deleteItem()
  })
}

//改變金額input時觸發
const handleChange = (val) => {
  updatePercent(val)
  commaChange(val)
}

//新增comma
const commaChange = (val) =>{
  let num = addComma(minusComma(handleInteger(val)))
  props.formData.payment = num
}

watch(() => props.state.total, () => {
    updatePercent(props.formData.payment)
  }
)



</script>