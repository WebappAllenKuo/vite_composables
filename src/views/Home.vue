<template>
  <div class="row horizontal">
    <el-col :span="4" class="navigator">
      <h5 class="mb-2">Category</h5>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="1" @click="routerChange('Composables')">
          <el-icon><document/></el-icon>
          <span>Composables</span>
        </el-menu-item>
        <el-menu-item index="2" @click="routerChange('Directive')">
          <el-icon><document/></el-icon>
          <span>Directive</span>
        </el-menu-item>
        <el-menu-item index="3" @click="routerChange('Final')">
          <el-icon><document/></el-icon>
          <span>Final</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Document, Menu as IconMenu } from '@element-plus/icons-vue'

const router = useRouter()

const routerChange = (path) => router.push({ name: path }) 
</script>
