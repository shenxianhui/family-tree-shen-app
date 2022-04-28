<template>
  <ly-tree
    :tree-data="treeData"
    :ready="ready"
    node-key="id"
    @node-expand="handleNodeExpand"
    @node-click="handleNodeClick"
  >
  </ly-tree>
</template>

<script>
import LyTree from '@/components/ly-tree/ly-tree.vue';

export default {
  components: {
    LyTree,
  },
  data() {
    return {
      ready: false, // 这里用于自主控制loading加载状态，避免异步正在加载数据的空档显示“暂无数据”
      treeData: [],
    };
  },
  onLoad() {
    // 模拟异步请求
    setTimeout(() => {
      this.treeData = [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 11,
              label: '二级 1-1',
              children: [
                {
                  id: 111,
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 21,
              label: '二级 2-1',
              children: [
                {
                  id: 211,
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              id: 22,
              label: '二级 2-2',
              children: [
                {
                  id: 221,
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 31,
              label: '二级 3-1',
              children: [
                {
                  id: 311,
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              id: 32,
              label: '二级 3-2',
              children: [
                {
                  id: 321,
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ];

      this.ready = true;
    }, 2000);
  },
  methods: {
    // uni-app中emit触发的方法只能接受一个参数，所以会回传一个对象，打印对象即可见到其中的内容
    handleNodeClick(obj) {
      console.log('handleNodeClick', JSON.stringify(obj));
    },
    handleNodeExpand(obj) {
      console.log('handleNodeExpand', JSON.stringify(obj));
    },
  },
};
</script>
