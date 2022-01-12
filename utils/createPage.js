const fs = require('fs')

const getView = () => {
    return `<script setup lang="ts"></script>
<template>
   <LayoutContainer>
        <van-nav-bar title="导航栏" left-arrow></van-nav-bar>
        <LayoutScroll>内容</LayoutScroll>
    </LayoutContainer>
</template>
<style lang="less" scoped>

</style>
`
}
const createPage =(viewPath)=>{
    fs.writeFileSync(viewPath, getView())
}
module.exports = createPage
