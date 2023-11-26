import React, {useState} from 'react';
import html2canvas from 'html2canvas';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState<{name: string, birthday: string, tel: string}>(
    {name: '', birthday: '', tel: ''}
  )

  const [image, setImage] = useState<string | ArrayBuffer | null>(null)

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, name: e.target.value})
  }

  const onChangeBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, birthday: e.target.value})
  }

  const onChangeTel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, tel: e.target.value})
  }

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target ? e.target.result : null)
      };
      reader.readAsDataURL(file)
    } else {
      setImage(null)
    }
  }

  const saveImage = (imageURL: string) => {
    const downloadLink = document.createElement("a");
    if (typeof downloadLink.download === "string") {
      downloadLink.href = imageURL;

      // ファイル名
      downloadLink.download = "profile.png";

      // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
      document.body.appendChild(downloadLink);

      // ダウンロードリンクが設定された a タグをクリック
      downloadLink.click();

      // Firefox 対策で追加したリンクを削除しておく
      document.body.removeChild(downloadLink);
    } else {
      window.open(imageURL);
    }
  }

  const onClickDownload = () => {
    html2canvas(document.querySelector(".show_profile")!).then(canvas => {
      const targetImageURL = canvas.toDataURL("image/png");
      saveImage(targetImageURL);
    });
  }

  return (
    <>
      <h1>プロフィール自動生成</h1>
      <div className="profile">
        <div className='show_profile'>
          <div className="image">
          <img src={image ? image.toString() : ''} alt='プロフィール写真'/>
          </div>
          <div className="name">{user.name}</div>
          <div>お誕生日:{user.birthday}</div>
          <div>電話番号:{user.tel}</div>
        </div>
        <div className='edit_profile'>
          <FormField label='お名前' id="name">
            <input type='text' onChange={onChangeName}/>
          </FormField>
          <FormField label='お誕生日' id="birthday">
            <input type='date' onChange={onChangeBirthday}/>
          </FormField>
          <FormField label='電話番号' id="tel">
            <input type='text' onChange={onChangeTel}/>
          </FormField>
          <FormField label='プロフィール写真' id="image">
            <input type="file" accept="image/*" onChange={onChangeImage}/>
          </FormField>
          <FormField label=''>
            <button onClick={onClickDownload}>Download as PNG</button>
          </FormField>
        </div>
      </div>
    </>
  );
}

type FormFieldProps = {
  id?: string;
  label: string;
  children: React.ReactNode;
}

const FormField = ({label, children, id}: FormFieldProps) => {
  return (
    <div className='form-field'>
      <label htmlFor={id}>{label}</label>
      <div>{children}</div>
    </div>
  );
}

export default Profile;
