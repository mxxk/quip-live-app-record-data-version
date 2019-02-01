import quip from 'quip';

class RootRecord extends quip.apps.RootRecord {
    static getProperties = () => ({
        child: ChildRecord,
    });

    static getDefaultProperties = () => ({
        child: {},
    });

    static DATA_VERSION = 2;
}

quip.apps.registerClass(RootRecord, 'root-record');

class ChildRecord extends quip.apps.Record {
    static getProperties = () => ({});

    static DATA_VERSION = 2;
}

quip.apps.registerClass(ChildRecord, 'child-record');

class Root extends React.Component {
    render() {
        const root = quip.apps.getRootRecord();
        const child = root.get('child');
        return (
            <ul>
                <li>
                    RootRecord.getDataVersion() == {root.getDataVersion()}
                </li>
                <li>
                    ChildRecord.getDataVersion() == {child.getDataVersion()}
                </li>
                <li>
                    Manually increment RootRecord data version
                    <br />
                    <quip.apps.ui.Button onClick={this.bump} text="Do it" />
                </li>
            </ul>
        );
    }

    bump = () => {
        const root = quip.apps.getRootRecord();
        root.setDataVersion(root.getDataVersion() + 1);
        this.forceUpdate();
    }
}

quip.apps.initialize({
    initializationCallback: function(rootNode, params) {
        if (params.isCreation) {
            // TODO: Uncomment line below to work around `RootRecord` not
            //     setting its own data version from `RootRecord.DATA_VERSION`.
            // quip.apps.getRootRecord().setDataVersion(RootRecord.DATA_VERSION);
        }
        ReactDOM.render(<Root />, rootNode);
    },
});
