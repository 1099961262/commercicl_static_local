<template>
  <div class="main">
    <div class="mapBox" ref="Map" id="container"></div>
    <el-input
      placeholder="请输入选择区域"
      v-model="searchInput"
      class="input-with-select"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        class="searchBut"
      ></el-button>
    </el-input>
    <el-button
      icon="el-icon-circle-plus-outline "
      class="drawerOpen"
      @click="drawer = true"
      >创建任务</el-button
    >
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :modal="false"
      :with-header="false"
      class="drawerBox"
      :size="500"
    >
      <div class="drawer-content">
        <div class="title">
          <i class="el-icon-s-order title-img"></i>
          <span class="title-info">基本信息</span>
        </div>
        <div class="steps-box">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="选择标签"></el-step>
            <el-step title="设置评分"></el-step>
            <el-step title="提交任务"></el-step>
          </el-steps>
        </div>
        <!-- 第一步 -->
        <el-form
          ref="formOne"
          :model="formOne"
          :rules="rulesOne"
          label-width="80px"
          v-if="active == 0"
        >
          <el-form-item prop="name" label="任务名称">
            <el-input v-model="formOne.name"></el-input>
          </el-form-item>
          <el-form-item prop="region" label="选择区域">
            <el-select
              v-model="formOne.region"
              placeholder="请选择区域"
              class="width100"
            >
              <el-option label="北京" value="tianj"></el-option>
              <el-option label="天津" value="beijing"></el-option>
              <el-option label="上海" value="shanghai"></el-option>
              <el-option label="重庆" value="chongq"></el-option>
              <el-option label="四川" value="shic"></el-option>
              <el-option label="贵州" value="guiz"></el-option>
              <el-option label="云南" value="uynnan"></el-option>
              <el-option label="河南" value="henan"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="pop" label="选择人群">
            <el-select
              v-model="formOne.pop"
              placeholder="请选择"
              class="width100"
            >
              <el-option label="全部用户" value="all"></el-option>
              <el-option label="按工作地" value="shanghai"></el-option>
              <el-option label="按居住地" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="date" label="选择时间">
            <el-date-picker
              v-model="formOne.date"
              type="month"
              placeholder="请选择"
              class="width100"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="radius" label="目标半径">
            <el-select
              v-model="formOne.radius"
              placeholder="请选择"
              class="width100"
            >
              <el-option label="500米" value="shanghai"></el-option>
              <el-option label="1000米" value="beijing"></el-option>
              <el-option label="1500米" value="aa"></el-option>
            </el-select>
          </el-form-item>
          <div class="tag-select-box">
            <div class="tag-title-box">
              <div class="tag-title">选择目标点位标签：</div>
              <div class="tag-info">
                (将基于所选标签，对照点位模型进行推荐位置)
              </div>
            </div>
            <div>
              <el-button type="info" plain @click="selectTag"
                >添加标签</el-button
              >
            </div>
          </div>
          <div class="area-select-all">
            <div class="area-select-all-top">
              <img
                src="@assets/img/24gf-tags3.png"
                alt=""
                class="select-all-top-img-two"
              />
              <div class="select-all-top-name">已选标签</div>
              <img
                src="@assets/img/qingchu.png"
                alt=""
                class="select-all-top-clear"
                @click="clearArea"
              />
            </div>
            <div class="selected-area-box">
              <div class="selected-area-cont">
                <div
                  class="selected-area"
                  v-for="(item, index) in areaArr"
                  :key="item.label"
                >
                  <span>{{ `${item.label}：${item.value}` }}</span>
                  <img
                    src="@assets/img/qingchu-2.png"
                    alt=""
                    class="selected-area-clear"
                    @click="() => loseArea(index)"
                  />
                </div>
              </div>
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="onSubmitOne">下一步</el-button>
            <el-button @click="resetOne('formOne')">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 第二步 -->
        <el-form v-if="active == 1">
          <div class="activeFraction-box">
            <el-collapse v-model="activeFraction" accordion>
              <el-collapse-item name="1">
                <div slot="title" class="collapse-item-title">基础设置</div>
                <div class="switch-box">
                  <div class="switch-none"></div>
                  <div>
                    <el-switch
                      v-model="useDefault"
                      active-text="使用默认"
                    ></el-switch>
                  </div>
                </div>
                <el-form
                  ref="formFraction"
                  :model="formFraction"
                  label-position="left"
                  :rules="formFractionRules"
                >
                  <el-form-item
                    label-width="250px"
                    label="总分100分，当前已设置最大分值"
                    prop="fraction"
                  >
                    <el-input v-model="formFraction.fraction" disabled>
                      <template slot="append">分</template>
                    </el-input>
                  </el-form-item>
                </el-form>
                <el-form ref="formTwo" :model="formTwo" label-position="left">
                  <el-tree
                    :data="fractionData"
                    node-key="value"
                    default-expand-all
                    :expand-on-click-node="false"
                  >
                    <div class="custom-tree-node" slot-scope="{ node }">
                      <el-form-item
                        :prop="getKey(node)"
                        :label="node.label"
                        class="custom-tree-node-item"
                        size="mini"
                        label-width="200px"
                        :rules="node.parent.key ? formOneRules : null"
                      >
                        <!-- :rules="node.parent.key ? formOneRules : null" -->
                        <el-input-number
                          v-model="formTwo[getKey(node)]"
                          :min="0"
                          :max="100"
                          placeholder="请输入正整数分值"
                          class="number-input"
                        ></el-input-number>
                        分
                      </el-form-item>
                    </div>
                  </el-tree>
                </el-form>
              </el-collapse-item>
              <el-collapse-item name="2">
                <div slot="title" class="collapse-item-title">
                  加分项一：APP使用偏好
                </div>
                <el-form
                  ref="formTwoTwo"
                  :model="formTwoTwo"
                  label-position="left"
                >
                  <el-tree
                    :data="twoFormData"
                    node-key="value"
                    default-expand-all
                    :expand-on-click-node="false"
                  >
                    <div class="custom-tree-node" slot-scope="{ node }">
                      <el-form-item
                        :prop="getKey(node)"
                        :label="node.label"
                        class="custom-tree-node-item"
                        size="mini"
                        label-width="200px"
                      >
                        <el-input-number
                          v-model="formTwoTwo[getKey(node)]"
                          :min="0"
                          :max="100"
                          placeholder="请输入正整数分值"
                          class="number-input"
                        ></el-input-number>
                        分
                      </el-form-item>
                    </div>
                  </el-tree>
                </el-form>
              </el-collapse-item>
              <el-collapse-item name="3">
                <div slot="title" class="collapse-item-title">
                  加分项二：周边配套
                </div>
                <el-form
                  ref="formTwoThree"
                  :model="formTwoThree"
                  label-position="left"
                >
                  <el-tree
                    :data="threeFormData"
                    node-key="value"
                    default-expand-all
                    :expand-on-click-node="false"
                  >
                    <div class="custom-tree-node" slot-scope="{ node }">
                      <el-form-item
                        :prop="getKey(node)"
                        :label="node.label"
                        class="custom-tree-node-item"
                        size="mini"
                        label-width="200px"
                      >
                        <el-input-number
                          v-model="formTwoThree[getKey(node)]"
                          :min="0"
                          :max="100"
                          placeholder="请输入正整数分值"
                          class="number-input"
                        ></el-input-number>
                        分
                      </el-form-item>
                    </div>
                  </el-tree>
                </el-form>
              </el-collapse-item>
            </el-collapse>
          </div>
          <el-form-item>
            <el-button type="primary" @click="onSubmitTwo">提交</el-button>
            <el-button @click="backStep">上一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <!-- 结果弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="tipsDialogVisible"
      width="500"
      center
      :before-close="tipsHandleClose"
    >
      <div class="result-box">
        <img src="@assets/img/chenggonganli.png" alt="" class="result-img" />
        <div class="result-title">任务创建成功！</div>
        <div class="result-info">
          您可以到“我的任务”页管理该任务和查看评估报告
        </div>
        <el-button type="primary" class="result-button" @click="tipsHandleClose"
          >我知道了({{ closeTime }}秒)</el-button
        >
      </div>
    </el-dialog>
    <!-- 添加标签 -->
    <el-dialog
      title="选择目标点位标签"
      :visible.sync="tagDialogVisible"
      width="90%"
      :before-close="tagHandleClose"
    >
      <div class="tag-box">
        <el-form ref="formTag" :model="formTag" :rules="rulesTag" size="small">
          <el-collapse v-model="activeNames" accordion>
            <el-collapse-item name="1">
              <div slot="title" class="collapse-item-title">基础设置</div>
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="wending" label="稳定/流动人口占比">
                    <el-select
                      v-model="formTag.wending"
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="人员非常稳定" value="1"></el-option>
                      <el-option label="人员较为稳定" value="2"></el-option>
                      <el-option label="稳定性一般" value="3"></el-option>
                      <el-option label="流动人口较多" value="4"></el-option>
                      <el-option label="流动人口非常多" value="5"></el-option>
                      <el-option label="流动人口为主" value="6"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="sex" label="性别">
                    <el-select
                      v-model="formTag.sex"
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="男" value="1"></el-option>
                      <el-option label="女" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="nengling" label="年龄">
                    <el-select
                      v-model="formTag.nengling"
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="18岁及以下" value="1"></el-option>
                      <el-option label="19-35岁" value="2"></el-option>
                      <el-option label="36-45岁" value="3"></el-option>
                      <el-option label="46-55岁" value="4"></el-option>
                      <el-option label="56-65岁" value="5"></el-option>
                      <el-option label="66岁及以上" value="6"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="huafei" label="话费消费档次">
                    <el-select
                      v-model="formTag.huafei"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="低消费" value="1"></el-option>
                      <el-option label="较低消费" value="2"></el-option>
                      <el-option label="中等消费" value="3"></el-option>
                      <el-option label="中高消费" value="4"></el-option>
                      <el-option label="高消费" value="5"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="zaiwang" label="手机号码在网时长">
                    <el-select
                      v-model="formTag.zaiwang"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="一年以下" value="1"></el-option>
                      <el-option label="1-3年" value="2"></el-option>
                      <el-option label="3-5年" value="3"></el-option>
                      <el-option label="5年以上" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="yueshangwang" label="月手机上网流量">
                    <el-select
                      v-model="formTag.yueshangwang"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="100M以下" value="1"></el-option>
                      <el-option label="101M-500M" value="2"></el-option>
                      <el-option label="501M-1G" value="3"></el-option>
                      <el-option label="1-5G" value="4"></el-option>
                      <el-option label="6-10G" value="5"></el-option>
                      <el-option label="10G以上" value="6"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="zhongduan" label="终端类型">
                    <el-select
                      v-model="formTag.yueshangwang"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="苹果" value="1"></el-option>
                      <el-option label="华为" value="2"></el-option>
                      <el-option label="OPPO" value="3"></el-option>
                      <el-option label="vivo" value="4"></el-option>
                      <el-option label="小米" value="5"></el-option>
                      <el-option label="三星" value="6"></el-option>
                      <el-option label="联想" value="7"></el-option>
                      <el-option label="其他" value="8"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item name="2">
              <div slot="title" class="collapse-item-title">APP使用偏好</div>
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="rijun" label="日均上网时长">
                    <el-select
                      v-model="formTag.rijun"
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="小于4小时" value="1"></el-option>
                      <el-option label="4-8小时" value="2"></el-option>
                      <el-option label="8小时以上" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="shejiao" label="社交类偏好（日均）">
                    <el-select
                      v-model="formTag.shejiao"
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option
                        label="轻度（不足1小时）"
                        value="1"
                      ></el-option>
                      <el-option label="中度 1-3小时" value="2"></el-option>
                      <el-option
                        label="重度  4小时及以上"
                        value="3"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="youxi" label="游戏类偏好（日均）">
                    <el-select
                      v-model="formTag.youxi"
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option
                        label="轻度（不足1小时）"
                        value="1"
                      ></el-option>
                      <el-option label="中度 1-3小时" value="2"></el-option>
                      <el-option
                        label="重度  4小时及以上"
                        value="3"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="touzhi" label="投资理财类偏好（日均）">
                    <el-select
                      v-model="formTag.touzhi"
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option
                        label="轻度（不足1小时）"
                        value="1"
                      ></el-option>
                      <el-option label="中度 1-3小时" value="2"></el-option>
                      <el-option
                        label="重度  4小时及以上"
                        value="3"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="chongwu" label="宠物类使用偏好（日均）">
                    <el-select
                      v-model="formTag.chongwu"
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option
                        label="轻度（不足1小时）"
                        value="1"
                      ></el-option>
                      <el-option label="中度 1-3小时" value="2"></el-option>
                      <el-option
                        label="重度  4小时及以上"
                        value="3"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="yundong" label="运动类使用偏好（日均）">
                    <el-select
                      v-model="formTag.yundong"
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option
                        label="轻度（不足1小时）"
                        value="1"
                      ></el-option>
                      <el-option label="中度 1-3小时" value="2"></el-option>
                      <el-option
                        label="重度  4小时及以上"
                        value="3"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="gouwu" label="购物类使用偏好（日均）">
                    <el-select
                      v-model="formTag.gouwu"
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option
                        label="轻度（不足1小时）"
                        value="1"
                      ></el-option>
                      <el-option label="中度 1-3小时" value="2"></el-option>
                      <el-option
                        label="重度  4小时及以上"
                        value="3"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item
                    prop="duanship"
                    label="短视频类使用偏好（日均）"
                  >
                    <el-select
                      v-model="formTag.duanship"
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option
                        label="轻度（不足1小时）"
                        value="1"
                      ></el-option>
                      <el-option label="中度 1-3小时" value="2"></el-option>
                      <el-option
                        label="重度  4小时及以上"
                        value="3"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item name="3">
              <div slot="title" class="collapse-item-title">周边配套</div>
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="jiaotong" label="交通配套">
                    <el-select
                      v-model="formTag.jiaotong"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="有公交站" value="1"></el-option>
                      <el-option label="有地铁站" value="2"></el-option>
                      <el-option label="有停车场" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="zhuzai" label="住宅和写字楼配套">
                    <el-select
                      v-model="formTag.zhuzai"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="有住宅" value="1"></el-option>
                      <el-option label="有写字楼" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="xinfang" label="住宅价格（新房）">
                    <el-select
                      v-model="formTag.xinfang"
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="大于区域平均" value="1"></el-option>
                      <el-option label="小于区域平均" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="xiezilou" label=" 写字楼租金价格">
                    <el-select
                      v-model="formTag.xiezilou"
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="大于区域平均" value="1"></el-option>
                      <el-option label="小于区域平均" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="xuexiao" label="学校">
                    <el-select
                      v-model="formTag.xuexiao"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="有幼儿园" value="1"></el-option>
                      <el-option label="有小学" value="2"></el-option>
                      <el-option label="有中学" value="3"></el-option>
                      <el-option label="有大学" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="jiaodian" label="餐饮酒店">
                    <el-select
                      v-model="formTag.jiaodian"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="有中餐厅" value="1"></el-option>
                      <el-option label="有西餐厅" value="2"></el-option>
                      <el-option label="有火锅" value="3"></el-option>
                      <el-option label="有烧烤" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="shangchao" label="商超">
                    <el-select
                      v-model="formTag.shangchao"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="大型超市" value="1"></el-option>
                      <el-option label="便利店" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="yule" label="休闲娱乐">
                    <el-select
                      v-model="formTag.yule"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="电影院" value="1"></el-option>
                      <el-option label="剧院" value="2"></el-option>
                      <el-option label="游乐场" value="3"></el-option>
                      <el-option label="休闲广场" value="4"></el-option>
                      <el-option label="咖啡馆" value="5"></el-option>
                      <el-option label="酒吧" value="6"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="gongyuan" label="公园景点">
                    <el-select
                      v-model="formTag.gongyuan"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="公园" value="1"></el-option>
                      <el-option label="动物园" value="2"></el-option>
                      <el-option label="植物园" value="3"></el-option>
                      <el-option label="景点" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="zhushu" label="酒店住宿">
                    <el-select
                      v-model="formTag.zhushu"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="酒店" value="1"></el-option>
                      <el-option label="招待所" value="2"></el-option>
                      <el-option label="度假村" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="meis" label="餐饮美食">
                    <el-select
                      v-model="formTag.meis"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="知名餐饮" value="1"></el-option>
                      <el-option label="自助餐" value="2"></el-option>
                      <el-option label="快餐" value="3"></el-option>
                      <el-option label="甜品" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6">
                  <el-form-item prop="tiyu" label="体育场所">
                    <el-select
                      v-model="formTag.tiyu"
                      multiple
                      placeholder="请选择"
                      class="width100"
                    >
                      <el-option label="体育场馆" value="1"></el-option>
                      <el-option label="高尔夫" value="2"></el-option>
                      <el-option label="健身中心" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <div class="tag-but-box">
            <el-button type="primary" @click="onSave">保存</el-button>
            <el-button @click="resetOne('formTag')">重置</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
let map; //地图实例

export default {
  data() {
    return {
      searchInput: "", //搜索框数据
      drawer: true, //抽屉显示控制
      active: 1, //步骤条控制
      formOne: {}, //第一步表单数据
      //第一步表单验证规则
      rulesOne: {
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      formFraction: {
        fraction: 0,
      },
      formFractionRules: {
        fraction: [
          {
            required: true,
            trigger: ["blur", "change"],
            validator: this.validataFraction,
          },
        ],
      },
      formTwo: {}, //第二步表单数据
      //第二步表单验证规则
      rulesTwo: {
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      tipsDialogVisible: false, //结果弹窗
      tagDialogVisible: false, //选择标签弹窗
      formTag: {}, //标签表单数据
      //标签表单验证规则
      rulesTag: {
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      activeNames: "1", //添加标签弹窗默认展开项
      activeFraction: "1", //添加分数默认展开项
      useDefault: false, //使用默认
      // 分数设置树状数据
      fractionData: [
        {
          id: 1,
          label: "稳定/流动人口占比",
          value: "wending",
          children: [
            {
              id: 2,
              label: "人员非常稳定",
              value: "a1",
            },
            {
              id: 3,
              label: "人员较为稳定",
              value: "a2",
            },
            {
              id: 4,
              label: "稳定性一般",
              value: "a3",
            },
            {
              id: 5,
              label: "流动人口较多",
              value: "a4",
            },
            {
              id: 6,
              label: "流动人口非常多",
              value: "a5",
            },
            {
              id: 7,
              label: "流动人口为主",
              value: "a6",
            },
          ],
        },
        {
          id: 8,
          label: "性别",
          value: "sex",
          children: [
            {
              id: 9,
              label: "男",
              value: "sex1",
            },
            {
              id: 10,
              label: "女",
              value: "sex2",
            },
          ],
        },
        {
          id: 11,
          label: "年龄:",
          value: "age",
          children: [
            {
              id: 12,
              label: "18岁及以下",
              value: "age1",
            },
            {
              id: 13,
              label: "19-35岁",
              value: "age2",
            },
            {
              id: 14,
              label: "36-45岁",
              value: "age3",
            },
            {
              id: 15,
              label: "46-55岁",
              value: "age4",
            },
            {
              id: 16,
              label: "56-65岁",
              value: "age5",
            },
            {
              id: 17,
              label: "66岁及以上",
              value: "age6",
            },
          ],
        },
        {
          id: 18,
          label: "话费消费档次:",
          value: "huafei",
          children: [
            {
              id: 19,
              label: "低消费",
              value: "huafei1",
            },
            {
              id: 20,
              label: "较低消费",
              value: "huafei2",
            },
            {
              id: 21,
              label: "中等消费",
              value: "huafei3",
            },
            {
              id: 22,
              label: "中高消费",
              value: "huafei4",
            },
            {
              id: 23,
              label: "高消费",
              value: "huafei5",
            },
          ],
        },
        {
          id: 24,
          label: "手机号码在网时长:",
          value: "hoama",
          children: [
            {
              id: 25,
              label: "一年以",
              value: "hoama1",
            },
            {
              id: 26,
              label: "1-3年",
              value: "hoama2",
            },
            {
              id: 27,
              label: "3-5年",
              value: "hoama3",
            },
            {
              id: 28,
              label: "5年以上",
              value: "hoama4",
            },
          ],
        },
        {
          id: 29,
          label: "月手机上网流量:",
          value: "shangwang",
          children: [
            {
              id: 30,
              label: "100M以下",
              value: "shangwang1",
            },
            {
              id: 31,
              label: "101M-500M",
              value: "shangwang2",
            },
            {
              id: 32,
              label: "501M-1G年",
              value: "shangwang3",
            },
            {
              id: 33,
              label: "1-5G",
              value: "shangwang4",
            },
            {
              id: 34,
              label: "6-10G",
              value: "shangwang5",
            },
            {
              id: 35,
              label: "10G以上",
              value: "shangwang6",
            },
          ],
        },
        {
          id: 36,
          label: "终端类型:",
          value: "zhuangduan",
          children: [
            {
              id: 37,
              label: "苹果",
              value: "zhuangduan1",
            },
            {
              id: 38,
              label: "华为",
              value: "zhuangduan2",
            },
            {
              id: 39,
              label: "OPPO",
              value: "zhuangduan3",
            },
            {
              id: 40,
              label: "vivo",
              value: "zhuangduan4",
            },
            {
              id: 41,
              label: "小米",
              value: "zhuangduan5",
            },
            {
              id: 42,
              label: "三星",
              value: "zhuangduan6",
            },
            {
              id: 43,
              label: "联想",
              value: "zhuangduan7",
            },
            {
              id: 44,
              label: "其他",
              value: "zhuangduan8",
            },
          ],
        },
      ],
      formOneRules: {
        trigger: ["blur", "change"],
        validator: this.validataFather,
      },

      areaArr: [
        {
          label: "性别",
          value: "女",
        },
        {
          label: "年龄",
          value: "19-35岁",
        },
        {
          label: "稳定/流动人口占比",
          value: "人员非常稳定",
        },
        {
          label: "话费消费档次",
          value: "中等消费",
        },
        {
          label: "手机号码在网时长",
          value: "1-3年",
        },
      ],
      closeTime: 3,

      twoFormData: [
        {
          id: 1,
          label: "日均上网时长",
          value: "wending",
          children: [
            {
              id: 2,
              label: "小于4小时",
              value: "a1",
            },
            {
              id: 3,
              label: "4-8小时",
              value: "a2",
            },
            {
              id: 4,
              label: "8小时以上",
              value: "a3",
            },
          ],
        },
        {
          id: 7,
          label: "社交类偏好（日均）",
          value: "sex",
          children: [
            {
              id: 5,
              label: "轻度（不足1小时）",
              value: "sex1",
            },
            {
              id: 6,
              label: "中度 1-3小时",
              value: "sex2",
            },
            {
              id: 8,
              label: "重度  4小时及以上",
              value: "sex3",
            },
          ],
        },
        {
          id: 11,
          label: "投资理财类偏好（日均）:",
          value: "age",
          children: [
            {
              id: 12,
              label: "轻度（不足1小时）",
              value: "age1",
            },
            {
              id: 13,
              label: "中度 1-3小时",
              value: "age2",
            },
            {
              id: 14,
              label: "重度  4小时及以上",
              value: "age3",
            },
          ],
        },
        {
          id: 18,
          label: "宠物类使用偏好（日均）:",
          value: "huafei",
          children: [
            {
              id: 19,
              label: "轻度（不足1小时）",
              value: "huafei1",
            },
            {
              id: 20,
              label: "中度 1-3小时",
              value: "huafei2",
            },
            {
              id: 21,
              label: "重度  4小时及以上",
              value: "huafei3",
            },
          ],
        },
        {
          id: 24,
          label: "运动类使用偏好（日均）:",
          value: "hoama",
          children: [
            {
              id: 25,
              label: "轻度（不足1小时）",
              value: "hoama1",
            },
            {
              id: 26,
              label: "中度 1-3小时",
              value: "hoama2",
            },
            {
              id: 27,
              label: "重度  4小时及以上",
              value: "hoama3",
            },
          ],
        },
        {
          id: 29,
          label: "购物类使用偏好（日均）:",
          value: "shangwang",
          children: [
            {
              id: 30,
              label: "轻度（不足1小时）",
              value: "shangwang1",
            },
            {
              id: 31,
              label: "中度 1-3小时",
              value: "shangwang2",
            },
            {
              id: 32,
              label: "重度  4小时及以上",
              value: "shangwang3",
            },
          ],
        },
        {
          id: 36,
          label: "短视频类使用偏好（日均）:",
          value: "zhuangduan",
          children: [
            {
              id: 37,
              label: "轻度（不足1小时）",
              value: "zhuangduan1",
            },
            {
              id: 38,
              label: "中度 1-3小时",
              value: "zhuangduan2",
            },
            {
              id: 39,
              label: "重度  4小时及以上",
              value: "zhuangduan3",
            },
          ],
        },
      ],
      formTwoTwo: {},
      formTwoThree: {},
      threeFormData: [
        {
          label: "交通配套",
          value: "wending",
          children: [
            {
              label: "有公交站",
              value: "wending1",
            },
            {
              label: "有地铁站",
              value: "wending2",
            },
            {
              label: "有停车场",
              value: "wending3",
            },
          ],
        },
        {
          label: "住宅和写字楼配套",
          value: "sex",
          children: [
            {
              label: "有住宅",
              value: "sex1",
            },
            {
              label: "有写字楼",
              value: "sex2",
            },
          ],
        },
        {
          label: "住宅价格（新房）",
          value: "age",
          children: [
            {
              label: "大于区域平均",
              value: "age1",
            },
            {
              label: "小于区域平均",
              value: "age2",
            },
          ],
        },
        {
          label: "写字楼租金价格",
          value: "zhujin",
          children: [
            {
              label: "大于区域平均",
              value: "zhujin1",
            },
            {
              label: "小于区域平均",
              value: "zhujin2",
            },
          ],
        },
        {
          label: "学校",
          value: "xuexiao",
          children: [
            {
              label: "有幼儿园",
              value: "xuexiao1",
            },
            {
              label: "有小学",
              value: "xuexiao2",
            },
            {
              label: "有中学",
              value: "xuexiao3",
            },
            {
              label: "有大学",
              value: "xuexiao4",
            },
          ],
        },
        {
          label: "餐饮酒店",
          value: "shangwang",
          children: [
            {
              label: "有中餐厅",
              value: "shangwang1",
            },
            {
              label: "有西餐厅",
              value: "shangwang2",
            },
            {
              label: "有火锅",
              value: "shangwang3",
            },
            {
              label: "有烧烤",
              value: "shangwang4",
            },
          ],
        },
        {
          label: "商超",
          value: "sahngcao",
          children: [
            {
              label: "大型超市",
              value: "sahngcao1",
            },
            {
              label: "便利店",
              value: "sahngcao2",
            },
          ],
        },
        {
          label: "休闲娱乐",
          value: "zhuangduan",
          children: [
            {
              label: "电影院",
              value: "zhuangduan1",
            },
            {
              label: "剧院",
              value: "zhuangduan2",
            },
            {
              label: "游乐场",
              value: "zhuangduan3",
            },
            {
              label: "休闲广场",
              value: "zhuangduan4",
            },
            {
              label: "咖啡馆",
              value: "zhuangduan5",
            },
            {
              label: "酒吧",
              value: "zhuangduan6",
            },
          ],
        },
      ],
    };
  },
  components: {},
  watch: {
    formTwo: {
      handler(newName, oldName) {
        let arr = Object.keys(newName);
        let number = 0;
        if (arr.length) {
          arr.map((item) => {
            if (newName[item]) {
              number += newName[item];
            }
          });
        }
        this.formFraction.fraction = number;
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    setTimeout(() => {
      // // 初始化地图
      map = new AMap.Map("container", {
        zoom: 9,
        mapStyle: "amap://styles/light",
      });
    }, 1000);
  },
  methods: {
    // 第一步点击确定
    onSubmitOne() {
      this.active = 1;
      // this.$refs.formOne.validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     return false;
      //   }
      // });
    },
    // 重置表单
    resetOne(formName) {
      this.$refs[formName].resetFields();
    },
    // 第二步点击提交
    onSubmitTwo() {
      this.active = 2;
      this.tipsDialogVisible = true;
      this.active = 0;
      this.drawer = false;
      let close = setInterval(() => {
        if (!this.closeTime) {
          clearInterval(close);
          this.tipsHandleClose();
          return;
        }
        this.closeTime = this.closeTime - 1;
      }, 1000);
    },
    // 第二步点击上一步
    backStep() {
      this.active = 0;
    },
    // 关闭结果提示弹窗
    tipsHandleClose() {
      this.tipsDialogVisible = false;
    },
    // 点击打开添加标签弹窗
    selectTag() {
      this.tagDialogVisible = true;
    },
    // 关闭选择标签提示弹窗
    tagHandleClose() {
      this.tagDialogVisible = false;
    },
    //  添加标签点击保存
    onSave() {
      // this.$refs.formTag.validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     return false;
      //   }
      // });
      this.tagDialogVisible = false;
    },
    // 验证正整数
    fractionValidatePass(rule, value, callback) {
      if (value === "") {
        callback(new Error("请填写分数"));
      } else if (!/(^[1-9]\d*$)/.test(value)) {
        callback(new Error("请输入正整数分值!"));
      } else {
        callback();
      }
    },

    getKey(node) {
      let a = node.parent.key
        ? `${node.parent.key}.${node.key}`
        : `${node.key}`;
      return a.toString();
    },

    // shanc
    loseArea(index) {
      this.areaArr.splice(index, 1);
    },
    clearArea() {
      this.areaArr = [];
    },
    // 表单密码校验
    validataFraction(rule, value, callback) {
      if (!value) {
        callback(new Error("分数不能为空"));
      } else if (value > 100) {
        callback(new Error("最大只能输入100分"));
      } else {
        callback();
      }
    },

    // 验证不能比父级大
    validataFather(rule, value, callback, source) {
      let arr = Object.keys(source);
      let brr = arr[0].split(".");
      if (brr.length) {
        if (this.formTwo[arr[0]] > this.formTwo[brr[0]]) {
          callback(new Error("子项分数不能超过父项"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  position: relative;
  .mapBox {
    width: 100%;
    height: 100%;
  }
  .input-with-select {
    width: 440px;
    position: absolute;
    left: 42px;
    top: 43px;
  }
  .searchBut {
    color: #28afff;
    font-size: 20px;
  }
  .drawerOpen {
    width: 137px;
    height: 56px;
    background-color: #28afff;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    position: absolute;
    top: 23px;
    right: 0;
    color: #fff;
  }
  .drawerBox {
    position: absolute !important;
  }
  .drawer-content {
    padding: 0 20px;

    .title {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #e5e5e5;
      padding-left: 30px;
      font-size: 18px;
      color: rgb(39, 117, 216);
      position: relative;
      margin-bottom: 10px;
      .title-img {
        width: 20px;
        height: 20px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .title-info {
        color: #3a3a3a;
        font-size: 18px;
        text-align: left;
        font-weight: bold;
      }
    }
    .steps-box {
      padding: 20px 0 0 0;
      margin-bottom: 30px;
    }
    .dateInput {
      width: calc(~"100% - 80px");
    }
    .dateTypebut {
      width: 70px;
      margin-left: 10px;
    }
    .area-select-box {
      width: 100%;
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      .area-select-item {
        width: 33%;
        .area-select-item-cont {
          width: 70px;
          margin: 0 auto;
          .item-cont-img {
            width: 40px;
            height: 40px;
            background-size: 100% 100%;
            margin: 0 auto;
            cursor: pointer;
          }
          .item-cont-img-two {
            width: 44px;
            height: 40px;
            background-size: 100% 100%;
            margin: 0 auto;
            cursor: pointer;
          }
          .item-cont-img-three {
            width: 33px;
            height: 41px;
            background-size: 100% 100%;
            margin: 0 auto;
            cursor: pointer;
          }
          .circle {
            background: url("~@assets/img/quanxuan.png") 100% 100% no-repeat;
          }
          .polygon {
            background: url("~@assets/img/duobianxingxuanze.png") 100% 100%
              no-repeat;
          }
          .moveMap {
            background: url("~@assets/img/shoudong.png") 100% 100% no-repeat;
          }
          .circleActive {
            background: url("~@assets/img/quanxuan-active.png") 100% 100%
              no-repeat;
          }
          .polygonActive {
            background: url("~@assets/img/duobianxingxuanze-active.png") 100%
              100% no-repeat;
          }
          .moveMapActive {
            background: url("~@assets/img/shoudong-active.png") 100% 100%
              no-repeat;
          }
          .item-cont-title {
            text-align: center;
            font-size: 16px;
            line-height: 50px;
            color: #363636;
          }
        }
      }
    }
    .area-select-all {
      width: 100%;
      height: 302px;
      background: #f8f8f8;
      border-radius: 6px;
      margin-bottom: 20px;
      overflow: hidden;
      .area-select-all-top {
        width: 100%;
        position: relative;
        padding-left: 60px;
        padding-right: 20px;
        background: #cde4ff;
        .select-all-top-img {
          width: 20px;
          height: 26px;
          position: absolute;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
        }
        .select-all-top-img-two {
          width: 22px;
          height: 22px;
          position: absolute;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
        }
        .select-all-top-name {
          width: 64px;
          line-height: 52px;
          height: 52px;
          font-size: 16px;
          color: #363636;
        }
        .select-all-top-clear {
          width: 24px;
          height: 23px;
          position: absolute;
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }
      .selected-area-box {
        width: 100%;
        height: 250px;
        padding: 20px 14px;
        overflow-y: auto;
        .selected-area-cont {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          .selected-area {
            background: #ffe3e3;
            border-radius: 13px;
            border: 1px solid #ff7979;
            font-size: 14px;
            color: #e35454;
            padding: 3px 30px 3px 10px;
            position: relative;
            margin-bottom: 10px;
            margin-right: 10px;
            .selected-area-clear {
              width: 12px;
              height: 12px;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              cursor: pointer;
            }
          }
          .selected-area:nth-child(3n) {
            margin-right: none;
          }
        }
      }
    }
    .tag-select-box {
      width: 100%;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .tag-title-box {
        .tag-title {
          font-size: 16px;
          color: #363636;
          line-height: 30px;
        }
        .tag-info {
          font-size: 12px;
          color: #ff621c;
        }
      }
    }
    .activeFraction-box {
      margin-bottom: 20px;
      .switch-box {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .switch-none {
          width: 100px;
          height: 20px;
        }
      }
      .custom-tree-node {
        display: flex;
        justify-content: space-between;
        // position: relative;
        // width: 100%;
        // height: 28px;
        // margin-bottom: 18px;
        .custom-tree-node-title {
          width: 50%;
        }
        .custom-tree-node-item {
          position: absolute;
          top: 0;
          left: 30px;
          .number-input {
            width: 170px;
          }
        }
      }
      /deep/.el-tree-node__content {
        // height: auto;
        width: 100%;
        height: 28px;
        margin-bottom: 18px;
        position: relative;
      }
    }
  }
  .result-box {
    .result-img {
      display: block;
      width: 89px;
      height: 94px;
      margin: 89px auto 0;
    }
    .result-title {
      font-size: 18px;
      font-weight: bold;
      color: #414141;
      margin-top: 20px;
      text-align: center;
    }
    .result-info {
      font-size: 16px;
      color: #888888;
      margin-top: 10px;
      text-align: center;
    }
    .result-button {
      display: block;
      margin: 68px auto 0;
    }
  }
  .tag-box {
    width: 100%;
    .collapse-item-title {
      font-size: 16px;
      font-weight: bold;
    }
    .tag-but-box {
      display: flex;
      justify-content: center;
      padding: 20px;
    }
  }
  .collapse-item-title {
    font-size: 16px;
    font-weight: bold;
  }
  .width100 {
    width: 100%;
  }
}
</style>
