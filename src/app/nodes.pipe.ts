import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';

import { Friend } from './friends.model';

export interface Chart {
  nodes: Node[];
  links: Link[];
}

export interface Node {
  id: string;
  name: string | undefined;
}

export interface Link {
  source: string;
  target: string;
}

@Pipe({ name: 'nodes' })
export class NodesPipe implements PipeTransform {
  transform(friends: Observable<Friend[] | null>): Observable<any> {
    return friends.pipe(
      debounceTime(500),
      filter((friends) => !!friends),
      map((friends: Friend[] | null) => {
        const nodes: Node[] = [];
        let links: Link[] = [];

        friends?.forEach((friend: Friend) => {
          nodes.push({ id: friend.id, name: friend.name });

          links = links.concat(
            friend.friends.map((target) => ({
              target,
              source: friend.id,
            }))
          );
        });

        return <Chart>{ nodes, links };
      })
    );
  }
}
