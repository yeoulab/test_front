<template>
    <ul style="list-style: none">
        <li v-for="a in items" v-bind:key="a.item">
            <v-card
                class="mx-auto"
                max-width="344"
                max-height="200"
                outlined
            >
                <v-list-item three-line>
                    <v-list-item-avatar
                        tile
                        size="80"
                        color="grey"
                    ></v-list-item-avatar>
                    <v-list-item-content>
                        <!--<div class="overline mb-4">특징</div>-->
                        <v-list-item-title class="headline mb-1">상호명</v-list-item-title>
                        <v-list-item-subtitle>주소</v-list-item-subtitle>
                        <v-list-item-subtitle>전화번호</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider dark></v-divider>
                <v-card-actions class="pa-4">
                    어때요?
                    <v-spacer></v-spacer>
                    <span class="grey--text text--lighten-2 caption mr-2">
                        댓글({{ reply }})
                    </span>
                    <v-spacer></v-spacer>
                    <span class="grey--text text--lighten-2 caption mr-2">
                        ({{ rating }})
                    </span>
                    <v-rating
                        v-model="rating"
                        background-color="white"
                        color="yellow accent-4"
                        dense
                        half-increments
                        hover
                        readonly
                        size="18"
                    ></v-rating>
                </v-card-actions>
            </v-card>
        </li>
    </ul>
</template>
<script>
export default {
    data() {
        return{
            items: [
                {item : 'a'},
                {item : 'b'},
                {item : 'c'}
            ],
            rating: 4.3,
            reply: 100,
        }
    }
}
</script>
