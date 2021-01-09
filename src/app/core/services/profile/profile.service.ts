import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '@wa/app/models/profile.model';

@Injectable()
export class ProfileService {
	constructor(private readonly firestore: AngularFirestore) {}

	async getProfileById(id: string): Promise<Profile> {
		const snapshot = await this.firestore.collection('profile').doc<Profile>(id).get().toPromise();

		return snapshot.data();
	}
}
