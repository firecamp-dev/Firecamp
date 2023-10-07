import { Checkbox, Container, Notes, SingleLineEditor } from '@firecamp/ui';
import { EEditorLanguage, EFirecampAgent } from '@firecamp/types';
import { _misc } from '@firecamp/utils';

enum EInputTypes {
  Text = 'text',
  Boolean = 'boolean',
  Number = 'number',
}

const configInputs = [
  {
    name: 'ping',
    type: EInputTypes.Boolean,
    labelFor: 'Ping',
    label: 'Ping',
  },
  {
    name: 'ping_interval',
    type: EInputTypes.Number,
    labelFor: 'Ping interval',
    label: 'Ping interval',
  },
];

const Config = ({ config = {}, onUpdate }) => {
  const isElectron = _misc.firecampAgent() === EFirecampAgent.Desktop;

  if (!config) return <></>;

  const _onChange = (name, value) => {
    if (!name) return;
    onUpdate(name, value);
  };

  const _renderElement = (element, index = 1) => {
    const {
      name,
      type,
      // labelFor,
      label,
      placeholder,
    } = element;

    if (!type) return <span />;

    // console.log(`config[name]`, name, config[name])
    switch (type) {
      case EInputTypes.Text:
      case EInputTypes.Number:
        // console.log(`config["ping"] `, config["ping"]);
        return (
          <div
            className={
              'relative items-center text-input-text text-sm w-full mb-5'
            }
            key={`${name}-${index}`}
          >
            <label
              className="text-app-foreground mb-1 block !pb-4"
              htmlFor={label}
            >
              {label}
            </label>
            <div className="!pb-4">
              <SingleLineEditor
                className={'border px-2 py-1 border-input-border'}
                autoFocus={false}
                name={name}
                type={type}
                // placeholder={placeholder || ''}
                disabled={!isElectron || config['ping'] === false}
                value={config[name]}
                onChange={(e) => {
                  if (e) {
                    e.preventDefault();
                    let { name, value } = e.target;
                    _onChange(name, value);
                  }
                }}
                height="21px"
                language={EEditorLanguage.FcText}
              />
            </div>
          </div>
        );
        break;
      case EInputTypes.Boolean:
        // console.log(`config[name]`, config[name]);
        return (
          <div key={`${name}-${index}`}>
            <label className="checkbox-in-grid">{label}</label>
            <Checkbox
              onToggleCheck={() => _onChange(name, !config[name])}
              checked={config[name] || false}
              classNames={{ root: 'fc-input-wrapper' }}
              disabled={!isElectron}
            />
          </div>
        );
        break;
      default:
        return <span />;
    }
  };

  const _handleSubmit = (e) => {
    e && e.preventDefault();
  };

  return (
    <Container>
      <form className="fc-form grid p-2" onSubmit={_handleSubmit}>
        {configInputs
          ? configInputs.map((config, index) => _renderElement(config, index))
          : ''}
      </form>
      {!isElectron ? (
        <Notes
          type="info"
          title="Desktop only feature"
          description="Please download desktop app to access this feature"
          withPadding={true}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Config;
