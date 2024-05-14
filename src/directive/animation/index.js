const animation = {
  mounted(el){
    const options = {
      root: document.querySelector('.directive'),
      threshold: 0.2
    }

    const fadeIn = `@keyframes fadeIn{
      0%{ opacity: 0; }
      100%{ opacity: 1; }
    }`
    const fadeOut = `@keyframes fadeOut{
      0%{ opacity: 1; }
      100%{ opacity: 0; }
    }`
    
    let ballStatus = false

    const callback = (entries => {
      entries.forEach(entry =>{
        const style = document.createElement('style')   // 創建一個 <style> 標籤

        const addStyle = (boolean, animation, name, method) => {
          ballStatus = boolean
          style.innerHTML = animation // 將動畫樣式插入 <style> 標籤
          document.head.appendChild(style) // 將 <style> 標籤插入到元素中
          el.style.animation = `${name} 2s ease-in forwards` // 添加動畫名稱到元素的 classList
          console.log(method)
        }

        if(entry.isIntersecting){
          addStyle(true, fadeIn, 'fadeIn', 'into')
        }else if(ballStatus == true){
          addStyle(false, fadeOut, 'fadeOut', 'leave')
        }
      })
    })
    let observer = new IntersectionObserver(callback, options)

    observer.observe(el)
  }
}

export default animation