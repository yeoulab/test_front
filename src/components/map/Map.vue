<template>
  <div class="map">
    <v-container>
      <div id="map" style="width:100%;height:500px;"></div>
    </v-container>
  </div>
</template>
<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=k0ch2lsnrj"></script>
<script>
  export default {
    name: 'Map',
    data() {
      return {
        map: null,
        markers: [],
        htmlMarker1: {
          content: '<div style="cursor:pointer;width:25px;height:25px;line-height:26px;font-size:10px;border-radius:50%;color:white;text-align:center;font-weight:bold;background:rgba(255, 149, 79, 0.75);background-size:contain;"></div>',
          size: N.Size(40, 40),
          anchor: N.Point(20, 20)
        },
        htmlMarker2: {
            content: '<div style="cursor:pointer;width:30px;height:30px;line-height:31px;font-size:10px;border-radius:50%;color:white;text-align:center;font-weight:bold;background:rgba(255, 149, 79, 0.75);background-size:contain;"></div>',
            size: N.Size(40, 40),
            anchor: N.Point(20, 20)
        },
        htmlMarker3: {
            content: '<div style="cursor:pointer;width:35px;height:35px;line-height:36px;font-size:10px;border-radius:50%;color:white;text-align:center;font-weight:bold;background:rgba(255, 149, 79, 0.75);background-size:contain;"></div>',
            size: N.Size(40, 40),
            anchor: N.Point(20, 20)
        },
        htmlMarker4: {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../../img/cluster-marker-4.png);background-size:contain;"></div>',
            size: N.Size(40, 40),
            anchor: N.Point(20, 20)
        },
        htmlMarker5: {
            content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(../../img/cluster-marker-5.png);background-size:contain;"></div>',
            size: N.Size(40, 40),
            anchor: N.Point(20, 20)
        },
      }
    },
    mounted() {
      this.$store.commit('setPageName',{pageName: '지도'})
      if (window.naver) {
        console.log("window.naver == true")
        this.map = new window.naver.maps.Map('map',{
            center: new naver.maps.LatLng(37.3595704, 127.105399), //지도의 초기 중심 좌표
            zoom: 14, //지도의 초기 줌 레벨
            //minZoom: 7, //지도의 최소 줌 레벨
            zoomControl: true, //줌 컨트롤의 표시 여부
            zoomControlOptions: { //줌 컨트롤의 옵션
                position: naver.maps.Position.TOP_RIGHT,
                style: naver.maps.ZoomControlStyle.SMALL
            }
        });

        //setOptions 메서드를 이용해 옵션을 조정할 수도 있습니다.
        // this.map.setOptions("mapTypeControl", true); //지도 유형 컨트롤의 표시 여부

        naver.maps.Event.addListener(this.map, 'zoom_changed', function (zoom) {
            console.log('zoom:' + zoom);
        });

        // marker test
        var marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(37.3595704, 127.105399),
                    draggable: true
        });
        this.markers.push(marker)

        var marker2 = new naver.maps.Marker({
                    position: new naver.maps.LatLng(37.3578575, 127.1063746),
                    draggable: true
        });
        this.markers.push(marker2)

        var marker3 = new naver.maps.Marker({
                    position: new naver.maps.LatLng(36.3578575, 127.105399),
                    draggable: true
        });
        this.markers.push(marker3)

        var markerClustering = new MarkerClustering({
                minClusterSize: 2, //default
                maxZoom: 12,
                map: this.map,
                markers: this.markers,
                disableClickZoom: false,
                gridSize: 100,
                icons: [this.htmlMarker1, this.htmlMarker2, this.htmlMarker3],
                indexGenerator: [100, 500, 1000],
                stylingFunction: function(clusterMarker, count) {
                    $(clusterMarker.getElement()).find('div:first-child').text(count);
                }
            });        

      } 
      else{
        console.log("####")
      }            
    }
  }
</script>

