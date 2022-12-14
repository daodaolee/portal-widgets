<template>
  <transition name="fade" appear>
    <div class="w100 h100 searchPanel" v-show="showSearchPanel">
      <div class="searchPanel-search">
        <div class="searchPanel-search-box flex">
          <div class="searchPanel-search-box-prefix flex-1 flex flex-center">
            <svg-icon class="search" name="search" title="搜索" />
          </div>
          <input ref="searchInput" class="h100" type="text" v-model="keyword" @input.stop="e => search(e)" />
        </div>
        <div class="searchPanel-search-panel normal flex flex-column" v-show="result.length">
          <p :class="[isResultActive === index ? 'active' : '']" v-for="(item, index) in result" :key="index"
            @click.stop="e => toSearchBookmark(item, e)">
            {{ item.title }}
          </p>
        </div>
        <div class="searchPanel-search-panel engines flex flex-column" v-show="showEngines">
          <p :class="[isResultActive === index ? 'active' : '']" v-for="(item, index) in enginesData" :key="index"
            @click.stop="(e: any) => toSearchEngine(item, e)">
            <svg-icon :name="item.svg" />&ensp;
            {{ keyword }}
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { engines, bookmark } from '@/global'
import { arrowUpDownChange, flatData, systemInfo } from '@/utils/tools'
import { useChineseToPinyin, useMetaKey } from '@/hooks'

let showSearchPanel = ref(false)
// 当前选中的条目
let isResultActive = ref(0)
let enginesData = ref(engines)
let currentBookmark: any = ref({})
window.addEventListener('keydown', (e: KeyboardEvent) => {
  // command + k 或者 esc 快捷键
  const info = systemInfo()
  const key1 = info === 'win' ? e.ctrlKey : e.metaKey
  const key2 = e.key === 'k'
  if (key1 && key2) {
    showSearchPanel.value = !showSearchPanel.value
    return
  }
  const key3 = e.key === 'Escape'
  if (key3) {
    showSearchPanel.value = false
    return
  }
  if (showSearchPanel.value) {
    // 上下按键更换选中条目
    arrowUpDownChange(isResultActive, result.value.length ? result : enginesData, e, () => {
      currentBookmark.value = result.value[isResultActive.value]

    })
  }
  // 回车跳转
  if (e.key === 'Enter') {
    if (showEngines.value) {
      if (isResultActive.value > 0) {
        window.open(enginesData.value[isResultActive.value].url + keyword.value, useMetaKey(e))
      } else {
        return
      }

    } else if (currentBookmark.value?.title) {
      window.open(currentBookmark.value.url, useMetaKey(e))
    }
  }
})
// 点击关闭
window.addEventListener('click', (e: any) => {
  if (e!.target!.classList.contains('searchPanel')) {
    showSearchPanel.value = false
  }
})

function clearArrowUpDown() {
  isResultActive.value = 0
}
// 点击书签面板跳转
function toSearchBookmark(bookmark: any, e: any) {
  currentBookmark.value = bookmark
  window.open(bookmark.url, useMetaKey(e))
}
// 监听当前选中书签
watch(currentBookmark, nv => {
  if (nv) {
    // keyword.value = currentBookmark.value.title
  }
})

// input自动focus
const searchInput: any = ref()
watch(showSearchPanel, nv => {
  if (nv) {
    nextTick(() => {
      searchInput.value.focus()
    })
  } else {
    showEngines.value = false
    keyword.value = ''
    result.value.length = 0
  }
})

let keyword = ref('')
// 获取所有书签
function getResultBookmark() {
  let temp = flatData(bookmark)
  return temp.filter((item: any) => item.url && item.title)
}
let bookmarkData = getResultBookmark()
let resultBookmark: any = ref([])
resultBookmark.value = bookmarkData.map((item: any) => {
  return {
    ...item,
    pinyin: useChineseToPinyin(item.title)
  }
})
let result: any = ref([])
let showEngines = ref(false)


// 搜索
function search(e: any) {
  clearArrowUpDown()
  arrowUpDownChange(isResultActive, result.value.length ? result : enginesData, e, () => {
    currentBookmark.value = result.value[isResultActive.value]
  })

  if (!keyword.value) {
    result.value.length = 0
    showEngines.value = false
    return
  }
  const includesStr = (data: any) => {
    return (
      data.title.includes(keyword.value) ||
      data.pinyin.includes(keyword.value)
      // data.url.includes(keyword.value)
    )
  }
  const data = resultBookmark.value.filter((data: any) => includesStr(data))
  nextTick(() => {
    if (data.length) {
      showEngines.value = false
      result.value = data.slice(0, 12)
    } else {
      showEngines.value = true
      result.value = []
    }
  })
}
function toSearchEngine(engine: any, e: KeyboardEvent) {
  window.open(engine.value.url + keyword.value, useMetaKey(e))
}
</script>
<style lang="less" scoped>
@import '../assets/css/common.less';

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
  opacity: 0.5;
}

.fade-enter {
  transition: all 0.2s;
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.searchPanel {
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--bookmark-mask-bg-color);


  &-search {
    position: absolute;
    left: 50%;
    margin-top: 18vh;
    transform: translateX(-50%);
    border: 1.6px solid var(--bookmark-border-color);
    border-radius: 10px;
    overflow: auto;
    background: var(--bookmark-bg-color);

    &-box {
      &-prefix {
        svg {
          width: 1.2em;
          height: 1.2em;
          color: var(--font-color);
        }

        padding: 0 10px;
      }

      input {
        width: 570px;
        height: 45px;
        background: var(--bookmark-bg-color);
        border: none;
        color: var(--font-color);
        transition: background 0.2s ease-in-out;
        letter-spacing: 0.5px;
        font-size: 14px;
      }
    }

    &-panel {
      transition: height 0.35s ease-in-out;
      padding: 10px;
      color: var(--font-color);
      opacity: 0.9;
      font-size: 14px;
      height: max-content;
      // max-height: 445px;
      overflow: auto;
      .scrollbar-hide();
      border-top: 1.6px solid var(--bookmark-border-color);

      p {
        cursor: pointer;
        transition: all 0.1s;
        border-radius: 6px;
        padding: 7px;
        align-items: center;
        width: 580px;
        .text-ellipsis();

        &:not(:last-child) {
          margin-bottom: 5px;
        }

        &.active,
        &:hover {
          background: var(--bookmark-hover-color)
        }
      }

      &.engines {
        svg {
          width: 1.2em;
          height: 1.2em;
        }
      }
    }
  }
}
</style>
