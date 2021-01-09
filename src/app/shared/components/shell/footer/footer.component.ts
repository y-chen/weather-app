import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Author } from '@wa/app/models/environment.model';
import { environment } from '@wa/environments/environment';

@Component({
	selector: 'wa-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnChanges, OnInit {
	@Input() open?: boolean = true;

	@HostBinding('attr.class') hostClass: string;

	appInfo: string;
	author: Author;

	ngOnChanges(changes: SimpleChanges): void {
		this.hostClass = changes.open.currentValue ? 'open' : 'closed';
	}

	ngOnInit(): void {
		const { name, version, author } = environment;
		this.appInfo = `${name} v${version}`;
		this.author = author;
	}
}
