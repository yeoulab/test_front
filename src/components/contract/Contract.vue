<template>
    <div class="contract">
        <v-container>
            <v-row wrap>
                <v-col cols="12" sm="6" md="4" lg="3" v-for="company in companies" :key="company.name">
                    <v-card
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
                                <v-list-item-title class="mb-1">{{ company.name }}</v-list-item-title>
                                <v-list-item-subtitle class="subheading grey--text">{{ company.address }}</v-list-item-subtitle>
                                <v-list-item-subtitle class="subheading grey--text">{{ company.tel }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider dark></v-divider>
                        <v-card-actions class="pl-4">
                            어때요?
                            <v-spacer></v-spacer>
                            <span class="grey--text text--lighten-2 caption mr-2">
                                댓글({{ company.reply }})
                            </span>
                            <v-spacer></v-spacer>
                            <span class="grey--text text--lighten-2 caption mr-2">
                                ({{ company.rating }})
                            </span>
                            <v-rating
                                v-model="company.rating"
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
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return{
            companies: [
                {name: '신우공업사', address: '수원', tel: '01024390000', reply: 30, rating: 4.3},
                {name: 'LK공업사', address: '수원', tel: '01024391111', reply: 150, rating: 3.1},
                {name: '도배전문', address: '수원', tel: '01024392222', reply: 176, rating: 2.5},
                {name: '샷시전문', address: '수원', tel: '0102439332', reply: 16, rating: 4.5},
            ]
        }
    }
}
</script>
