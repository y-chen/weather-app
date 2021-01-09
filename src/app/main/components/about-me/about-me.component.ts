import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'wa-about-me',
	templateUrl: './about-me.component.html',
	styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {
	links = [
		{
			icon: 'linkedin',
			name: 'LinkedIn',
			url: 'https:/www.linkedin.com/in/yiyi-chen-web-developer',
		},
		{
			icon: 'github',
			name: 'Github',
			url: 'https://github.com/y-chen',
		},
		{
			icon: 'download-resume',
			name: 'Download CV',
			url: 'https://onedrive.live.com/download?cid=D019FA525DBE651D&resid=D019FA525DBE651D%214751&authkey=AEgnuD75ZkHhF3A&em=2',
		},
	];

	constructor() {}

	ngOnInit(): void {}
}
