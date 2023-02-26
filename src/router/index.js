import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import WinnersList from "@/views/WinnersList.vue";
import LuckyNamesPerDay from "@/views/LuckyNamesPerDay";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/winnersList",
		name: "WinnersList",
		component: WinnersList
	},
	{
		path: "/luckyNamesPerDay",
		name: "LuckyNamesPerDay",
		component: LuckyNamesPerDay
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
