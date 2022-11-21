<script setup lang="ts">
import { ref, onMounted } from 'vue'

const company_tags: string[] = ["天ぷら", "カラオケ有り"]
const plan_tags: string[] = ["天ぷら", "飲み放題"]

onMounted(() => {
})

</script>

<template>
	<Seo />
	<main>
		<div class="top">
			<a href="/">TOP</a> > 屋形船詳細
			<h2>三浦屋</h2>
			<p>神田川支部(エリア名)</p>
			<p>¥ 12,000</p>
			<div v-for="tag in company_tags" class="tags">
				<p>{{tag}}</p>
			</div>
			<figure style="width: 100%">
				<img src="@/images/company.jpg" width=100%/>
			</figure>
			<section>
				<h3>～浮かぶ料亭～一品一品手作りの本格的な会席料理を屋形船で</h3>
				<p>旬の食材や新鮮な魚介、吟味されたお肉料理など上質な食材を贅沢に使った一品一品手作りの本格的な和食会席です。晴海屋名物「揚げたて天ぷら」は、毎朝豊洲から仕入れる新鮮な魚介を3代目が自らさばき、熟練の技で揚げるサクッとした食感がたまらない極上の逸品です。晴海屋だからこそ味わえる、至極のお食事体験をお楽しみください。</p>
			</section>
		</div>
		<div class="planlist">
			<h3>プラン一覧</h3>
			<article class="card">
				<figure style="width: 50%">
					<img src="@/images/plan.jpg" width="100%"/>
				</figure>
				<section>
					<h3>デートや女子会にもオススメ！乗合屋形船（ふりそで御膳/全10品)</h3>
					<p>2名から乗船できる乗合屋形船♪旬の食材をふんだんに取り入れた江戸前お料理コースと飲み放題付♪デートや女子会にオススメです★</p>
					<div v-for="tag in plan_tags">
						<p>{{tag}}</p>
					</div>
					<div class="flex">
						<h3>大人 ¥ 12,000 </h3>
						<h3>中高生 ¥ 10,000 </h3>
					</div>
					<div class="flex">
						<h3>小学生 ¥ 6,000 </h3>
						<h3>幼児 ¥ 3,000 </h3>
					</div>
				</section>
			</article>
		</div>
		<div class="detail">
			<h3>船会社基本情報</h3>
			<table>
				<tr>
					<th>船会社名</th>
					<td>三浦屋</td>
				</tr>
				<tr>
					<th>電話番号</th>
					<td>123-4567-8901</td>
				</tr>
				<tr>
					<th>営業時間</th>
					<td>08:00 ~ 23:00<br/>※毎週曜日は定休日</td>
				</tr>
				<tr>
					<th>住所</th>
					<td>〒140-0001<br/>東京都品川区北品川1-16-8 船清ビル</td>
				</tr>
				<tr>
					<th>HP</th>
					<td>https://staging.yakatabune-kumiai.jp/</td>
				</tr>
			</table>
		</div>
	</main>
</template>
