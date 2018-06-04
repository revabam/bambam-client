import { BamUser } from '../../models/bamuser.model';

export class HomeUtil {
    /**
     * @author Craig Koepele | 1803-mar05-java-usf
     * @param id
     * Creates a mock BamUser object based on an input id
     */
    static getUserById(id: number): BamUser {
        const user: BamUser = new BamUser(id, '', '', '', '',
            '' , 0, null, '', '', '', '', 0);
        return user;
  }
}
