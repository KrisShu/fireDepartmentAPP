<template>
    <div class="terminal">
        <van-tabs color="#0385FD"  v-model="activeName">
            <van-tab title="火警联网" name="a">
                <firenetworkList></firenetworkList>
            </van-tab>
            <van-tab title="安全用电" name="b">
                <safeElectric></safeElectric>
            </van-tab>
            <van-tab title="消防管网" name="c">
                <piepnetwork></piepnetwork>
            </van-tab>
            <van-tab title="独立烟感" name="d">
                <smokeSensation></smokeSensation>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import piepnetwork from './piepnetwork'
import firenetworkList from './firenetworkList'
import safeElectric from './safeElectric'
import smokeSensation from './smokeSensation'
export default {
    components:{
        piepnetwork,
        firenetworkList,
        safeElectric,
        smokeSensation
    },
    data() {
        return {
            activeName: 'a',
        };
    },
    created(){
        this.activeName = this.$route.query.active
    }
}
</script>

<style>

</style>