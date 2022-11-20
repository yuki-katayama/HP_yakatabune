<script setup lang="ts">

const tags: string[] = ["天ぷら", "カラオケ有り"]

</script>

<template>
	<Seo />
	<main>
		<div class="header">
			<input type="date" placeholder="ご利用日"/>
			<select name="cars" id="cars">
				<option value="volvo">Volvo</option>
				<option value="saab">Saab</option>
				<option value="mercedes">Mercedes</option>
				<option value="audi">Audi</option>
			</select>
			<button>
				<img src="icons/search.jpg" />
			</button>
		</div>
		<div class="container">
			<article class="card">
				<figure style="width: 20%">
					<img src="/images/sample.jpg" width="100%"/>
				</figure>
				<section>
					<h2>三浦屋</h2>
					<p>神田川支部(エリア名)</p>
					<p>¥ 12,000</p>
					<div v-for="tag in tags" class="tags">
						<p>{{tag}}</p>
					</div>
				</section>
			</article>
		</div>
	</main>
</template>
