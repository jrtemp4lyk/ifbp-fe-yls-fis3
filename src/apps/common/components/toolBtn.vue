<template>
	<div class="btn-group">

		<template v-for="items in btnGroup">
			<div class="el-button-group" style="margin-left: 10px;" v-if="items.length!=1">
				<template v-for="group in items">
					<div class="el-dropdown" v-if="group.children" @mouseleave="leaveout($event)">
						<el-button  class="more-button" @click="showMore=!showMore">
							更多<i class="iconfont">&#xe7ce;</i>
						</el-button>
						<ul  class="group-more" v-show="showMore">
							<li  v-for="dropBtn in group.children" @click="eventBus(dropBtn)">{{dropBtn.btnName}}</li>
						</ul>
					</div> 
					<el-button  v-else @click="eventBus(group)" :disabled="!btnState[group.btnValue]" :key="group.btnValue">
						<i :class="group.btnIcon"></i>
						<span>{{group.btnName}}</span>
					</el-button>
				</template>

			</div>
			<el-button :type="items[0].btnValue=='addFun'?'primary':'default'" v-else @click="eventBus(items[0])" :class="items[0].btnType" :disabled="!btnState[items[0].btnValue]">
				<i :class="items[0].btnIcon"></i>
				<span style="margin-left: 4px;">{{items[0].btnName}}</span>
			</el-button>
		</template>
			



	</div>

</template>

<script>
	export default {
		props: ["btnUrl", "btnState"],
		name: "toolBtn",
		data() {
			return {
				btnGroup: [],
				showMore:false
			}
		},
		created() {
			axios.get(this.btnUrl).then((response) => {
				this.btnGroup = response.data
			})
		},
		methods: {
			leaveout(ele){
				if(ele.relatedTarget)
				this.showMore = false
				
			},
			handleCommand(command) {
				this.$parent[command]()

			},
			eventBus(btn) {
				this.$parent[btn.btnValue](btn.btnName)
				this.showMore=false
			}

		}
	}
</script>